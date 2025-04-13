import { ponder } from 'ponder:registry';

ponder.on("BleuNFT:Mint", (event) => {
  console.log(event);
});

ponder.on("FullBleuNFT:NFTMinted", (event) => {
  console.log(event);
});

ponder.on("FullBleuNFT:NFTStaked", (event) => {
  console.log(event);
});

ponder.on("FullBleuNFT:NFTUnstaked", (event) => {
  console.log(event);
});