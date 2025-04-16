import { ponder } from 'ponder:registry';
import { accounts, tokens, events } from "../ponder.schema"


ponder.on("BleuNFT:Mint", async ({event, context}) => {
  console.log(event)
});

ponder.on("FullBleuNFT:NFTMinted", async ({event, context}) => {
  console.log(event)
  const accountRow = await context.db.insert(accounts).values({
    address: event.args.to,
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
});