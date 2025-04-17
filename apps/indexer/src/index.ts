import { ponder } from 'ponder:registry';
import { accounts, tokens, events } from "../ponder.schema"
import { issueAttestation, revokeAttestation } from "./eas_atestation"


ponder.on("BleuNFT:Mint", async ({event, context}) => {
  console.log(event)
});

ponder.on("FullBleuNFT:NFTMinted", async ({event, context}) => {
  console.log(event)
  const accountRow = await context.db.insert(accounts).values({
    address: event.args.to,
    total_staked: 0,
  }).onConflictDoNothing();

  const tokenRow = await context.db.insert(tokens).values({
    id: event.args.tokenId,
    owner: event.args.to,
    staked: false,
  });

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

  const accountRow = await context.db
    .select(accounts)
    .where({ address: tokenRow.owner })
    .get();
  
  // Check if the account exists
  if (accountRow) {
    const new_total_staked = accountRow.total_staked + 1
    if (accountRow.attestationUID) {
      revokeAttestation(accountRow.attestationUID)
    }
    const newAttestationUID = issueAttestation({
      recipient: accountRow.address,
      level: "level " + new_total_staked + " staker",
      reason: "staked " + new_total_staked + " NFT's" ,
    })
    await context.db
      .update(accounts, { address: tokenRow.owner })
      .set({ 
        total_staked: new_total_staked,
        attestationUID: newAttestationUID,
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

  const accountRow = await context.db
    .select(accounts)
    .where({ address: tokenRow.owner })
    .get();
  
  // Check if the account exists
  if (accountRow) {
    const new_total_staked = accountRow.total_staked - 1;
    if (accountRow.attestationUID) {
      revokeAttestation(accountRow.attestationUID)
    }
    const newAttestationUID = issueAttestation({
      recipient: accountRow.address,
      level: "level " + new_total_staked + " staker",
      reason: "staked " + new_total_staked + " NFT's" ,
    })
    await context.db
      .update(accounts, { address: tokenRow.owner })
      .set({ 
        total_staked: new_total_staked,
        attestationUID: newAttestationUID,
       });
  }
});

ponder.on("FullBleuNFT:Transfer", async ({event, context}) => {
  const eventRow = await context.db.insert(events).values({
    id: event.log.id,
    event: event.name,
    token: event.args.tokenId,
    timestamp: event.block.timestamp,
  });
  console.log(event.args)

  const tokenRow = await context.db
    .update(tokens, { id: event.args.tokenId })
    .set({ owner: event.args.to });
});