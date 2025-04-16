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
      address: '0xBe63Eb46a54aead7EC70D16e0A2c85a0C7Cf16E2',
      abi: FullBleuNFTAbi,
      functionName: 'mintNFT',
      args: ["0x778F609Ae977B633a0FEC8832b0Bb781ad0Fd819"],
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
