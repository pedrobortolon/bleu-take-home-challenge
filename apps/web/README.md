# Bleu NFT Staking Contract Frontend

This is the frontend application to interact with the BleuNFT contract. To run it you'll need to:

1. Install Dependencies
If you have pnpm installed just run
```bash
pnpm install
```

2. Setup environment variables
You should create a .env file with the enviroment variables:
APP_URL -> The URL in which you want to run the service (best use http://localhost:3000)
NEXT_PUBLIC_CONTRACT_ADDRESS -> The address of the contract you are interacting with
NEXT_PUBLIC_BACKEND_URL -> The URL to access you backend server (the one you're running the indexer on)
NEXT_PUBLIC_N_TOTAL_STAKERS -> The number of top stakers you want displayed in the global stats page

3. Start it
To start running the service just run the following command line:
If you have pnpm installed just run
```bash
pnpm dev
```