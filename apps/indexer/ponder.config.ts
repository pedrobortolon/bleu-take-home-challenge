import { createConfig } from 'ponder';
import { http } from 'viem';

import { BleuNFTAbi } from './abis/BleuNFTAbi';
import { FullBleuNFTAbi } from './abis/FullBleuNFTAbi';

export default createConfig({
  networks: {
    anvil_localhost_testnet: {
      chainId: 31337,
      transport: http(process.env.PONDER_ANVIL_RPC_URL),
    },
    // sepolia_testnet: {
    //   chainId: 11155111,
    //   transport: http(process.env.PONDER_SEPOLIA_RPC_URL),
    // },
  },
  contracts: {
    BleuNFT: {
      network: 'anvil_localhost_testnet',
      // Note: You'll probably want to use a mergeAbis function to merge the abi with the erc721 abi
      abi: BleuNFTAbi,
      address: '0x2415e8Caf540596F68ab85D83FDD60B1439A85d8',
      startBlock: 0,
    },
    FullBleuNFT: {
      network: 'anvil_localhost_testnet',
      // Note: You'll probably want to use a mergeAbis function to merge the abi with the erc721 abi
      abi: FullBleuNFTAbi,
      address: process.env.CONTRACT_ADDRESS,
      startBlock: process.env.START_BLOCK,
    },
  },
});
