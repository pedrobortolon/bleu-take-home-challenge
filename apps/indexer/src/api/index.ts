import { db } from 'ponder:api';
import schema from 'ponder:schema';
import { Hono } from 'hono';
import { client, graphql } from 'ponder';
import { formatEther, getAddress } from "viem";

const app = new Hono();

app.use('/sql/*', client({ db, schema }));

app.use('/', graphql({ db, schema }));
app.use('/graphql', graphql({ db, schema }));

app.get("/addresstokens/:address", async (c) => {
    // const account = getAddress(c.req.param("address"));
    
    const list = [{
        tokenId: 0,
        owner: "0x778F609Ae977B633a0FEC8832b0Bb781ad0Fd819",
        staked: false
    },{
        tokenId: 1,
        owner: "0x778F609Ae977B633a0FEC8832b0Bb781ad0Fd819",
        staked: false
    },{
        tokenId: 2,
        owner: "0x778F609Ae977B633a0FEC8832b0Bb781ad0Fd819",
        staked: false
    }]

    return c.json(list)
});

app.get("/token/:tokenId", async (c) => {
    return c.text()
  });

export default app;
