export enum Routes {
  HOME = '/',
  CREATE = '/create',
  CAST = '/cast',
  WATCH = '/watch',
}

export const ProtectedRutes = [Routes.HOME, Routes.CREATE, Routes.CAST];
export const ContractAddress = process.env.NEXT_PUBLIC_FACTORY_CONTRACT_ADDRESS ?? "";
export const NFTMarketAddress = "https://opensea.io/assets/polygon"
export const PlayerURL = "https://player-generator.vercel.app/iframe?streamid="