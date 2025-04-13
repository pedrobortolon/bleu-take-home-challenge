import { onchainTable } from 'ponder';
import FullBleuNFT from "abis/FullBleuNFTAbi.ts";

export const example = onchainTable('example', (t) => ({
  id: t.text().primaryKey(),
  name: t.text(),
}));
