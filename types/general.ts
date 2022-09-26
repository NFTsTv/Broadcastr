export type lnft = {
  id: string;
  owner: string;
  contractAddress: string;
  name: string;
  price?: number;
  maxMintNumber?: number;
}


export type user = {
  id: string;
}