import { BigNumberish } from "ethers";

export interface FactoryContractParameters {
  owner: string;
  contractAddress: string;
  name: string;
  price?: number;
  maxMintNumber?: number;
}
export interface CastrContractAttributes {
  currentTokenId: number;
  baseTokenURI: string;
  LNFTname: string;
  description: string;
  totalSupply: number;
  mintPrice: number;
}

export type Castr = {
  name: string;
  description: string;
  price: BigNumberish;
  limitedSupply: boolean;
  totalSupply: Number;
  baseUri: string;
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

