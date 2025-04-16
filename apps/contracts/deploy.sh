#!/bin/bash

# Check if PRIVATE_KEY and RPC_URL environment variables are set
if [ -z "$PRIVATE_KEY" ]; then
  echo "Error: PRIVATE_KEY environment variable is not set."
  exit 1
fi

if [ -z "$RPC_URL" ]; then
  echo "Error: RPC_URL environment variable is not set."
  exit 1
fi

# Run the scripts with the private key and RPC URL from the environment
forge script script/FullBleuNFT.s.sol --rpc-url $RPC_URL --private-key $PRIVATE_KEY --broadcast
