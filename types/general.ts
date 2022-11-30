export type lnftContractParameters = {
  owner: string;
  contractAddress: string;
  name: string;
  price?: number;
  maxMintNumber?: number;
}

export interface Lnft {
  currentTokenId: number;
  baseTokenURI: string;
  LNFTname: string;
  description: string;
  totalSupply: number;
  mintPrice: number;
}


// export type lnft = {
//   id: {
//     tokenId: string;
//   }
//   balance: number;
//   contract: {
//     address: string;
//   },
//   contractMetadata: {
//     name: string;
//     symbol: string;
//     tokenType: string;
//     description: string;
//   }
//   metadata: {
//     name: string;
//     description: string;
//     image: string;
//     animation_url: string;
//     external_url: string;
//   }
//   timeLastUpdated: number;
//   title: string;
//   tokenURI: string;
// }


export type user = {
  id: string;
}