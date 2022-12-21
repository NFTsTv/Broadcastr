import { CreateContext } from "context/createContext";
import React from "react";
import {
  useAsset,
  useUpdateAsset,
  useCreateStream,
  Stream,
} from "@livepeer/react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { createMetadata } from "utils/helpers";
import { post } from "utils/requests";
import { LiveNFT } from "context/createContext";
import contractInterface from "contracts/contract-abi.json";

const contractConfig = {
  addressOrName: "0x7278AE17fdb96f8033F8625f201107Ed0C173c24",
  contractInterface: contractInterface,
};

const useCreateLiveNFT = () => {
  const context = React.useContext(CreateContext);
  if (!context) {
    throw "context requred to use this hook";
  }
  const { liveNFT, setLiveNFT } = context;
  const [error, setError] = React.useState<string | undefined>();
  const {
    data: assetData,
    mutate: createStream,
    status: createStreamStatus,
    error: createStreamError,
  } = useCreateStream({ name: liveNFT.name });

  const { config, error: prepareContractWriteError} = usePrepareContractWrite({
    ...contractConfig,
    functionName: "createLiveNFT",
  });

  const { data, write: deployContract, isLoading, isSuccess } = useContractWrite(config);

  const { status: writeTransactionStatus, error: txError } = useWaitForTransaction({
    hash: data?.hash,
  });


  React.useEffect(() => {
    if (createStreamStatus === "success") {
      const metadata = createMetadata({
        name: liveNFT.name,
        description: liveNFT.description,
        playbackId: assetData?.playbackId || "",
      });
      post("/api/collection/uploadMetadata", metadata).then((res) => {
        setLiveNFT({ ...liveNFT, baseUri: res?.url });
      });
    }
    if (writeTransactionStatus === "success") {
      alert("success")
    }
  }, [createStreamStatus, writeTransactionStatus]);


  React.useEffect(() => {
    if(txError){
      setError(txError.message)
    }
    if(prepareContractWriteError){
      setError(prepareContractWriteError.message)
    }
    if(createStreamError) {
      setError(createStreamError.message)
    }
  }, [txError, prepareContractWriteError, createStreamError])

  const handleSetData = (key: keyof LiveNFT, value: string) => {
    setLiveNFT({ ...liveNFT, [key]: value });
  };

  const handleCreateStream = () => {
    if (liveNFT.name !== "" && liveNFT.description !== "") {
      createStream && createStream();
    } else {
      setError("Fill all parameters")
    }
  };

  return {
    handleSetData,
    handleCreateStream,
    deployContract,
    error,
    isLoading: isLoading || createStreamStatus === "loading" || writeTransactionStatus === "loading"
  };
};

export default useCreateLiveNFT;
