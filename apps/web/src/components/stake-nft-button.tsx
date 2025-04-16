'use client';

import { type BaseError, useWriteContract, useWaitForTransactionReceipt  } from 'wagmi';
import { FullBleuNFTAbi } from '../../../indexer/abis/FullBleuNFTAbi';
import { Button } from './ui/button';
import { useEffect, useState, useRef } from 'react';

export default function StakeNFTButton({ token, onComplete }) {
  const { data: hash, error, isPending, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const [action, setAction] = useState<'stake' | 'unstake' | null>(null);

  const hasTriggered = useRef(false);

  //update NFTItem 2 seconds after the transaction is complete
  //to give time for the database to update
  useEffect(() => {
    if (isSuccess && !hasTriggered.current) {
      hasTriggered.current = true;
      setTimeout(() => {
        onComplete?.();
        hasTriggered.current = false;
      }, 2000);
    }
  }, [isSuccess, onComplete]);

  async function stake(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setAction('stake');
    writeContract({
      address: '0xBe63Eb46a54aead7EC70D16e0A2c85a0C7Cf16E2',
      abi: FullBleuNFTAbi,
      functionName: 'stake',
      args: [token.id],
    });
  }

  async function unstake(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setAction('unstake');
    writeContract({
      address: '0xBe63Eb46a54aead7EC70D16e0A2c85a0C7Cf16E2',
      abi: FullBleuNFTAbi,
      functionName: 'unstake',
      args: [token.id],
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
      {isPending && (
        <div>
          <p>Loading</p>
        </div>
      )}
    </>
  );
}
