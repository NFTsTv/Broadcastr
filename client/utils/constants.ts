import { Address } from "wagmi";
import { getNetwork } from "@wagmi/core";
import { polygon, polygonMumbai } from "@wagmi/core/chains";

export enum Routes {
  HOME = "/",
  CREATE = "/create",
  CAST = "/",
  WATCH = "/watch",
}

export const ProtectedRutes = [Routes.CREATE, Routes.CAST, Routes.HOME];


export const ContractAddress = (): Address => {
    return (process.env.NEXT_PUBLIC_FACTORY_CONTRACT_ADDRESS || "") as Address;
};

export const NFTMarketAddress = "https://opensea.io/assets/polygon";
export const PlayerURL = "https://player-generator.vercel.app/iframe?streamid=";

export enum Network {
  Opensea = "https://opensea.io/assets/matic",
  Rarible = "https://rarible.com/token/polygon",
  NFTScan = "https://polygon.nftscan.com",
  Broadcastr = "https://app.broadcastr.xyz/watch",
}

export const currentChain = process.env.NODE_ENV === "production" ? polygon : polygon