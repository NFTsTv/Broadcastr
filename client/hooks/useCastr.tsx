import { useEffect, useMemo, useState } from "react";
import { useStream, useStreamSessions } from "@livepeer/react";
import { useContractRead } from "wagmi";
import CastrFactoryABI from "contracts/CastrFactory-abi";
import { get } from "utils/requests";
import { parseParams } from "utils/helpers";
import { Castr } from "types/general";
import { ContractAddress } from "utils/constants";

const useCastr = (address: string) => {
  const [CastrData, setCastrData] = useState<Castr | null>(null);
  const [properties, setProperties] = useState({
    streamId: "",
    ownerAddress: "",
  });
  const { data } = useContractRead({
    address: ContractAddress,
    abi: CastrFactoryABI,
    functionName: "getMetadata",
    args: [address],
  });

  useEffect(() => {
    if (data) {
      const item = parseParams(data as Castr[keyof Castr][]);
      setCastrData(item);

      if (!item.baseUri) {
        console.log("error no base uri", item);
        return;
      }
      get(item.baseUri).then((response) => {
        if (response?.properties) {
          setProperties({
            streamId: response.properties.CastrId,
            ownerAddress: response.properties.creator_address,
          });
        }
      });
    }
  }, [data]);

  const { data: stream } = useStream({
    streamId: properties.streamId,
    refetchInterval: (stream) => (!stream?.isActive ? 5000 : false),
  });

  const { data: sessions } = useStreamSessions({
    streamId: properties.streamId,
  });

  return useMemo(() => {
    return {
      stream,
      sessions,
      CastrData,
    };
  }, [stream, sessions, CastrData]);
};

export default useCastr;
