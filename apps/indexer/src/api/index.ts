import { db } from "ponder:api";
import schema from "ponder:schema";
import { Hono } from "hono";
import {
  and,
  count,
  desc,
  eq,
  client,
  graphql,
  inArray,
} from "ponder";
import { getAddress } from "viem";

const app = new Hono();

app.use('/sql/*', client({ db, schema }));

app.use('/', graphql({ db, schema }));
app.use('/graphql', graphql({ db, schema }));

app.get("/tokens/:address", async (c) => {
    const address = getAddress(c.req.param("address"));
  
    const tokens = await db
      .select()
      .from(schema.tokens)
      .where(eq(schema.tokens.owner, address));
  
    return c.json(tokens);
});

app.get("/tokens/id/address/:address", async (c) => {
  const address = getAddress(c.req.param("address"));

  const tokens = await db
    .select({tokenId: schema.tokens.id})
    .from(schema.tokens)
    .where(eq(schema.tokens.owner, address));

  const tokenIds = tokens.map((t) => t.tokenId);

  return c.json(tokenIds);
});

app.get("/total-staked", async (c) => {
  const tokens = await db
      .select()
      .from(schema.tokens)
      .where(
        eq(schema.tokens.staked, true)
      );

  return c.json(tokens);
});

app.get("/tokens/:address/staked", async (c) => {
    const address = getAddress(c.req.param("address"));

    const tokens = await db
        .select()
        .from(schema.tokens)
        .where(
        and(
            eq(schema.tokens.owner, address),
            eq(schema.tokens.staked, true)
        )
        );

    return c.json(tokens);
});

app.get("/tokens/:address/unstaked", async (c) => {
    const address = getAddress(c.req.param("address"));

    const tokens = await db
        .select()
        .from(schema.tokens)
        .where(
        and(
            eq(schema.tokens.owner, address),
            eq(schema.tokens.staked, false)
        )
        );

    return c.json(tokens);
});

app.get("/tokens/id/:id", async (c) => {
  const id = c.req.param("id");

  const [token] = await db
    .select()
    .from(schema.tokens)
    .where(eq(schema.tokens.id, id));

  if (!token) {
    return c.notFound(); // or: return c.json({ error: "Token not found" }, 404);
  }

  return c.json(token);
});

app.get("/events/token/:id", async (c) => {
    const tokenId = Number(c.req.param("id"));

    const events = await db
        .select()
        .from(schema.events)
        .where(eq(schema.events.token, tokenId));

    return c.json(events);
});

app.get("/events/address/:address", async (c) => {
    const address = getAddress(c.req.param("address"));
  
    const tokens = await db
      .select({ id: schema.tokens.id })
      .from(schema.tokens)
      .where(eq(schema.tokens.owner, address));
  
    const tokenIds = tokens.map((t) => t.id);
  
    if (tokenIds.length === 0) return c.json([]);
  
    const events = await db
      .select()
      .from(schema.events)
      .where(inArray(schema.events.token, tokenIds));
  
    return c.json(events);
});

app.get("/top-stakers/:n", async (c) => {
  const n = Number(c.req.param("n"));

  const result = await db
    .select({
      address: schema.accounts.address,
      tokenCount: count(schema.tokens.id),
    })
    .from(schema.accounts)
    .leftJoin(
      schema.tokens,
      and(eq(schema.accounts.address, schema.tokens.owner),
      eq(schema.tokens.staked), true)
    )
    .groupBy(schema.accounts.address)
    .orderBy(desc(count(schema.tokens.id)))
    .limit(n);

  return c.json(result);
});  

export default app;
