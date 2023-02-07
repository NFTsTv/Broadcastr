
export enum Routes {
  HOME = '/',
  CREATE = '/create',
  CAST = '/cast',
  WATCH = '/watch',
}

export const ProtectedRutes = [Routes.HOME, Routes.CREATE, Routes.CAST];
export const ContractAddress = process.env.NEXT_PUBLIC_FACTORY_CONTRACT_ADDRESS ?? "";
export const NFTMarketAddress = "https://testnets.opensea.io/assets/mumbai"