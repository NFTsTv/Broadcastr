export type lnftContractParameters = {
  owner: string;
  contractAddress: string;
  name: string;
  price?: number;
  maxMintNumber?: number;
}

export type lnft = {
  id: {
    tokenId: string;
  }
  balance: number;
  contractAddress: string;
  contractMetadata: {
    name: string;
    symbol: string;
    tokenType: string;
    description: string;
  }
  metadata: {
    name: string;
    description: string;
    image: string;
    animation_url: string;
    external_url: string;
  }
  timeLastUpdated: number;
  title: string;
  tokenURI: string;
}


export type user = {
  id: string;
}