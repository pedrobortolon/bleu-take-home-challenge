import MintNFTButton from '@/components/mint-nft-button';
import NFTInfo from '@/components/nft-info';
import { placeholder } from '@bleu-builders/tech-challenge-ui';

export default function Home() {
  return (
    <div>
      <MintNFTButton />
      <NFTInfo />
    </div>
  );
}
