'use client';
import { type BaseError } from 'wagmi';
import StakeNFTButton from "@/components/stake-nft-button";
import { useEffect, useState } from "react";
import axios from "axios";

export default function NFTItem({ tokenId }) {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchToken() {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:42070/tokens/id/${tokenId}`);
      setToken(response.data);
    } catch (error) {
      console.error("Error fetching token:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchToken();
  }, [tokenId]);

  if (!token || isLoading) return <p>Loading...</p>;

  return (
    <div className="flex flex-row gap-4 items-center">
      <p>{tokenId} | {token.owner} | {token.staked ? "staked" : "unstaked"}</p>
      <StakeNFTButton token={token} onComplete={fetchToken} />
    </div>
  );
}
