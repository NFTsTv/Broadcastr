export interface FactoryContractParameters {
  owner: string;
  contractAddress: string;
  name: string;
  price?: number;
  maxMintNumber?: number;
}
export interface LNFTContractAttributes {
  currentTokenId: number;
  baseTokenURI: string;
  LNFTname: string;
  description: string;
  totalSupply: number;
  mintPrice: number;
}

export interface LNFTMetadata {
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

