import {
  useAsset,
  useUpdateAsset,
  useCreateStream,
  Stream,
} from "@livepeer/react";
import { useAccount, useContractRead } from "wagmi";
import contractInterface from "contracts/LNFTcontract-abi.json";

export const useLivenft = (address: any) => {
  const { isConnected } = useAccount();


  const { data, error, isError, isLoading, status } = useContractRead({
    addressOrName: address,
    contractInterface: contractInterface,
    functionName: "getCreatorChannels",
    args: [address],
  });

  console.log(data , status)

  return {
    data
  }
};
