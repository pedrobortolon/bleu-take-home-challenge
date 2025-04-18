import { ponder } from 'ponder:registry';
import { accounts, tokens, events } from "../ponder.schema"
import { manageAccountAttestation } from "./eas_atestation"

const attestationEnabled = process.env.ATTESTATION_ENABLED == "true"

// ponder.on("BleuNFT:Mint", async ({event, context}) => {
//   console.log(event)
// });

ponder.on("FullBleuNFT:NFTMinted", async ({event, context}) => {
  const accountRow = await context.db.insert(accounts).values({
    address: event.args.to,
    totalStaked: 0,
  }).onConflictDoNothing();

  const eventRow = await context.db.insert(events).values({
    id: event.log.id,
    event: event.name,
    token: event.args.tokenId,
    timestamp: event.block.timestamp,
  });
});

ponder.on("FullBleuNFT:NFTStaked", async ({event, context}) => {
  const eventRow = await context.db.insert(events).values({
    id: event.log.id,
    event: event.name,
    token: event.args.tokenId,
    timestamp: event.block.timestamp,
  });

  const tokenRow = await context.db
    .update(tokens, { id: event.args.tokenId })
    .set({ staked: true });
  
  const accountRow = await context.db.find(accounts, {address: event.args.staker});
  
  if (accountRow && attestationEnabled) {
    const newTotalStaked = accountRow.totalStaked + 1
    const newAttestationUID = await manageAccountAttestation({
      account: accountRow,
      newTotalStaked: newTotalStaked,
    })
    await context.db
      .update(accounts, { address: tokenRow.owner })
      .set({ 
        totalStaked: newTotalStaked,
        attestationUID: newAttestationUID,
       });
  } else if (accountRow) {
    const newTotalStaked = accountRow.totalStaked + 1
    await context.db
      .update(accounts, { address: tokenRow.owner })
      .set({ 
        totalStaked: newTotalStaked,
       });
  }
});

ponder.on("FullBleuNFT:NFTUnstaked", async ({event, context}) => {
  const eventRow = await context.db.insert(events).values({
    id: event.log.id,
    event: event.name,
    token: event.args.tokenId,
    timestamp: event.block.timestamp,
  });

  const tokenRow = await context.db
    .update(tokens, { id: event.args.tokenId })
    .set({ staked: false });

  const accountRow = await context.db.find(accounts, {address: event.args.staker});

  if (accountRow && attestationEnabled) {
    const newTotalStaked = accountRow.totalStaked - 1;
    const newAttestationUID = manageAccountAttestation({
      account: accountRow,
      newTotalStaked: newTotalStaked,
    });
    await context.db
      .update(accounts, { address: accountRow.address })
      .set({ 
        totalStaked: newTotalStaked,
        attestationUID: newAttestationUID,
       });
  } else if (accountRow) {
    const newTotalStaked = accountRow.totalStaked - 1
    await context.db
      .update(accounts, { address: tokenRow.owner })
      .set({ 
        totalStaked: newTotalStaked,
       });
  }
});

ponder.on("FullBleuNFT:Transfer", async ({event, context}) => {
  if (event.args.to != process.env.CONTRACT_ADDRESS) {
    await context.db.insert(events).values({
      id: event.log.id,
      event: event.name,
      token: event.args.tokenId,
      timestamp: event.block.timestamp,
    });
    await context.db.insert(tokens)
    .values({
      id: event.args.tokenId,
      owner: event.args.to,
      staked: false,
    })
    .onConflictDoUpdate((token) => ({ owner: event.args.to}));
  }
});