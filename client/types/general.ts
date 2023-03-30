import { BigNumberish } from "ethers";


export type Castr = {
  name: string;
  description: string;
  price: BigNumberish;
  limitedSupply: boolean;           
totalSupply: number;
  baseUri: string;
  currentSubs: BigNumberish;
};

export interface CastrMetadata {
  name: string;
  description: string;
  image: string;
  external_url: string;
  animation_url?: string; 
  properties: {
    creator_address: string;
    LNFTId: string;
  };
}

  