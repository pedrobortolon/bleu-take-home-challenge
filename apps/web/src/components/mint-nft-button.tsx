'use client';
import { useAccount } from 'wagmi';
import { FullBleuNFTAbi } from '../../../indexer/abis/FullBleuNFTAbi';
import { ethers } from 'ethers';
import { Button } from './ui/button';
import { useState } from 'react';

export default function MintNFTButton() {
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function mint(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
      const signer = new ethers.Wallet(
        process.env.NEXT_PUBLIC_PRIVATE_KEY as string,
        provider
      );

      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string,
        FullBleuNFTAbi,
        signer
      );

      const tx = await contract.mintNFT(address);
      await tx.wait();
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
  }

  return (
    <>
      <Button onClick={mint} type="button" className="py-2 px-4 rounded-lg" disabled={loading}>
        Mint
      </Button>
      {loading && <span className="ml-2">Minting...</span>}
      {error && <div className="text-red-500">Error: {error}</div>}
    </>
  );
}
