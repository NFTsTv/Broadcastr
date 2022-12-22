import React from "react";
import {
  useAsset,
  useUpdateAsset,
  useCreateStream,
  useStream,
} from "@livepeer/react";
import { useAccount, useContractRead } from "wagmi";
import LNFTcontractABI from "contracts/factory-abi";
import { get } from "utils/requests";
import { parseParams } from "utils/helpers";
import { LiveNFT } from "context/createContext";

export const useLivenft = (address: string) => {
  const contractAddress =
    process.env.NEXT_PUBLIC_FACTORY_CONTRACT_ADDRESS ?? "";

  const [lnftData, setLnftData] = React.useState<LiveNFT | null>(null);
  const [properties, setProperties] = React.useState({
    streamId: "",
    ownerAddress: "",
  });
  const { isConnected } = useAccount();
  const { data } = useContractRead({
    addressOrName: contractAddress,
    contractInterface: LNFTcontractABI,
    functionName: "getMetadata",
    args: [address],
  });

  React.useEffect(() => {
    if (data) {
      const item = parseParams(data as Array<string>);
      setLnftData(item);

      if (!item.baseUri) {
        return;
      }
      get(item.baseUri).then((response) => {
        if (response) {
          setProperties({
            streamId: response.properties.LNFTId,
            ownerAddress: response.properties.creator_address,
          });
        }
      });
    }
  }, [data]);

  const { data: stream } = useStream({
    streamId: properties.streamId,
  });


  return {
    stream,
    lnftData,
  };
};
