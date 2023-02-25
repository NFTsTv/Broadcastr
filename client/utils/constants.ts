import { Address } from "wagmi"

export enum Routes {
  HOME = '/',
  CREATE = '/create',
  CAST = '/cast',
  WATCH = '/watch',
}

export const ProtectedRutes = [Routes.CREATE, Routes.CAST];
export const ContractAddress = process.env.NEXT_PUBLIC_FACTORY_CONTRACT_ADDRESS as Address ?? "";
export const NFTMarketAddress = "https://opensea.io/assets/polygon"
export const PlayerURL = "https://player-generator.vercel.app/iframe?streamid="

export enum Network {
  Opensea = "https://opensea.io/assets/matic",
  Rarible = "https://rarible.com/token/polygon",
  NFTScan = "https://polygon.nftscan.com",
}