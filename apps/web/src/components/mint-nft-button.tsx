'use client';

import { type BaseError, useWriteContract } from 'wagmi';
import { FullBleuNFTAbi } from '../../../indexer/abis/FullBleuNFTAbi';
import { Button } from './ui/button';

export default function MintNFTButton() {
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  async function mint(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    console.log('passou aqui');
    writeContract({
      address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
      FullBleuNFTAbi,
      functionName: 'mintNFT',
      args: [],
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
