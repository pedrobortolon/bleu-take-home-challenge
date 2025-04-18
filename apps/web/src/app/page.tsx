'use client';

import MintNFTButton from '@/components/mint-nft-button';
import NFTInfo from '@/components/nft-info';
import { useState } from 'react';

export default function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  function handleMintComplete() {
    // increment refresh trigger to notify NFTInfo
    setRefreshTrigger((prev) => prev + 1);
  }

  return (
    <div>
      <MintNFTButton onMintComplete={handleMintComplete} />
      <NFTInfo refreshTrigger={refreshTrigger} />
    </div>
  );
}
