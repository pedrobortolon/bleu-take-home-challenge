'use client';

import { type BaseError, useWriteContract } from 'wagmi';
import { FullBleuNFTAbi } from '../../../indexer/abis/FullBleuNFTAbi';
import { Button } from './ui/button';

export default function StakeNFTButton({ token }) {
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  async function stake(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    console.log('passou aqui');
    writeContract({
      address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
      FullBleuNFTAbi,
      functionName: 'stake',
      args: [token.tokenId],
    });
  }

  async function unstake(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    console.log('passou aqui');
    writeContract({
      address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
      FullBleuNFTAbi,
      functionName: 'unstake',
      args: [token.tokenId],
    });
  }

  return (
    <>
      <Button
        onClick={token.staked ? unstake : stake}
        type="button"
        className="py-2 px-4 rounded-lg"
      >
        {token.staked ? 'unstake' : 'stake'}
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
