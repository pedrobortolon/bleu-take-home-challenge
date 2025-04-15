import { createConfig } from 'ponder';
import { http } from 'viem';

import { BleuNFTAbi } from './abis/BleuNFTAbi';
import { FullBleuNFTAbi } from './abis/FullBleuNFTAbi';

export default createConfig({
  networks: {
    anvil_localhost_testnet: {
      chainId: 31337,
      transport: http('http://localhost:8545'),
    },
  },
  contracts: {
    BleuNFT: {
      network: 'anvil_localhost_testnet',
      // Note: You'll probably want to use a mergeAbis function to merge the abi with the erc721 abi
      abi: BleuNFTAbi,
      address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
      startBlock: 0,
    },
    FullBleuNFT: {
      network: 'anvil_localhost_testnet',
      // Note: You'll probably want to use a mergeAbis function to merge the abi with the erc721 abi
      abi: FullBleuNFTAbi,
      address: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
      startBlock: 0,
    },
  },
});
