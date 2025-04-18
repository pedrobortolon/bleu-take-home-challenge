# Bleu NFT Staking Contract Indexer

This directory contains the backed server implementation to manage information regarding the FullBleuNFT smart contract. It uses a graphl database to store data and the information can be accesses through the Hono api running on port 42069.

# Database

The database schema has three main entities. The account entity is composed by:

```bash
address: hex number with the address of the account
totalStaked: integer with the number of the account staked tokens
attestationUID: the UID of the accounts attestation of staker level
```

The token entity is composed by:

```bash
id: the token id
owner: the hex number of the token owner address
staked: the state of the token
```

The event entity is composed by:

```bash
id: the log id of the event
event: the string name of the event
token: the token id of which the event relates to
timestamp: the integer timestamp of when the event was triggered
```

# API
The API endpoints and their responses are:

- /tokens/:address -> Get all the tokens associated with the address passed as parameter
- /tokens/id/address/:address -> The list of tokenId's that the address owns
- /total-staked -> The total number of staked NFT's in the contract
- /tokens/:address/staked -> All the staked NFT's of the account
- /tokens/:address/unstaked -> All the unstaked NFT's of the account
- /tokens/id/:id -> The NFT related to that token id
- /events/token/:id -> The events related to the token which the id belongs to
- /events/address/:address -> All the events related to NFT's owned by the address
- /top-stakers/:n -> The n accounts with the most stakes

# Setup
To run this project you'll need to

1. Install dependencies
If you have pnpm installed just run
```bash
pnpm install
```
2. Setup environment variables
You should create a .env.local file with the enviroment variables:
PONDER_ANVIL_RPC_URL -> With the url to access you local anvil network (usualy http://localhost:8545).
PONDER_SEPOLIA_RPC_URL  -> With the url to access the sepolia network.
NETWORK_TO_INDEX  -> Set to sepolia, if you want to index your contract in sepolia, or anvil_localhost_testnet, if you want to index your local anvil testnet.
START_BLOCK  -> The block you want to start indexing from (best option is the block in which the contract was deployed).
CONTRACT_ADDRESS  -> The address to your contract in the network you set.
PRIVATE_KEY  -> Your developer private key to perform the attestations
ATTESTATION_ENABLED  -> true if you want to enable the attestation system (not working yet) or false if you don't

3. Start running
To start running it just run the command
```bash
pnpm dev
```