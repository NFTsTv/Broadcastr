import {
  useAsset,
  useUpdateAsset,
  useCreateStream,
  useStream,
} from "@livepeer/react";
import { useAccount, useContractRead } from "wagmi";
import LNFTcontractABI from "contracts/LNFTcontract-abi";

export const useLivenft = (streamId: any) => {
  const { isConnected } = useAccount();
  const { data: stream } = useStream({
    streamId: "4edafnkh8kxqsbo4"
  });

  console.log(stream?.streamKey)


  return {
    stream
  }
};
