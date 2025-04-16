'use client';
import { type BaseError, useWriteContract, useAccount } from 'wagmi';
import { FullBleuNFTAbi } from '../../../indexer/abis/FullBleuNFTAbi';
import { Button } from './ui/button';

export default function MintNFTButton() {
  const { data: hash, error, isPending, writeContract } = useWriteContract();
  const { address, isConnected } = useAccount();

  async function mint(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    writeContract({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi: FullBleuNFTAbi,
      functionName: 'mintNFT',
      args: [address],
    });
  }

  return (
    <>
      <Button onClick={mint} type="button" className="py-2 px-4 rounded-lg">
        Mint
      </Button>
      {error && (
        <div>
          Error: {(error as BaseError).shortMessage || error.message}
          {console.log(error)};
        </div>
      )}
    </>
  );
}
