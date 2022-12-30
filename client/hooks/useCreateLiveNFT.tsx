import { CreateContext } from "context/createContext";
import React from "react";
import { useCreateStream } from "@livepeer/react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  useAccount,
} from "wagmi";

import { createMetadata } from "utils/helpers";
import { post } from "utils/requests";
import factoryContract from "contracts/factory-abi";
import { parseEther } from "ethers/lib/utils";

const contractAddress = process.env.NEXT_PUBLIC_FACTORY_CONTRACT_ADDRESS ?? "";

const useCreateLiveNFT = () => {
  const { address } = useAccount();
  const context = React.useContext(CreateContext);
  const [createError, setError] = React.useState<string | undefined>();
  if (!context) {
    throw "context requred to use this hook";
  }
  const { liveNFT, handleSetData, validateFormData } = context;
  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);

  const {
    data: assetData,
    mutate: createStream,
    status: createStreamStatus,
    error: createStreamError,
  } = useCreateStream({ name: liveNFT.name, record: true });

  const { config, isSuccess: prepareContractWriteSuccess } =
    usePrepareContractWrite({
      addressOrName: contractAddress,
      contractInterface: [...factoryContract],
      functionName: "createLiveNFT",
      args: validateFormData()
        ? [
            liveNFT.baseUri,
            liveNFT.name,
            liveNFT.description,
            process.env.NEXT_PUBLIC_APP_URL + "/api/collection/getMetadata?address=",
            Number(liveNFT.totalSupply),
            parseEther(liveNFT.price)
          ]
        : [],
    });

  const {
    data,
    write,
    isLoading,
    error: contractWriteError,
  } = useContractWrite(config);

  const { status: writeTransactionStatus, error: txError } =
    useWaitForTransaction({
      hash: data?.hash,
    });

  React.useEffect(() => {
    if (createStreamStatus === "success") {
      if (!assetData) return;
      setIsLoadingRequest(true);
      const metadata = createMetadata({
        name: liveNFT.name,
        description: liveNFT.description,
        LNFTId: assetData.id,
        streamId: assetData?.id,
        playbackUrl: assetData?.playbackUrl,
        address: address ?? "",
      });
      post("/api/collection/uploadMetadata", metadata).then((res) => {
        handleSetData("baseUri", res?.url);
        setIsLoadingRequest(false);
      });
    }
    if (writeTransactionStatus === "success") {
      alert("success");
      window.location.href = "/list";
    }
  }, [createStreamStatus, writeTransactionStatus]);

  React.useEffect(() => {
    if (txError) {
      setError(txError.message);
    }
    if (createStreamError) {
      setError(createStreamError.message);
    }
    if (contractWriteError) {
      setError(contractWriteError.message);
    }
  }, [txError, contractWriteError, createStreamError]);

  const handleCreateStream = () => {
    if (liveNFT.name !== "" && liveNFT.description !== "") {
      createStream && createStream();
    } else {
      setError("Fill all parameters");
    }
  };

  const deployContract = () => {
    if (validateFormData()) {
      write?.();
    } else {
      setError("wrong formdata");
    }
  };

  return {
    prepareContractWriteSuccess,
    handleCreateStream,
    deployContract,
    error: createError,
    isLoading:
      isLoading ||
      createStreamStatus === "loading" ||
      writeTransactionStatus === "loading" ||
      isLoadingRequest,
  };
};

export default useCreateLiveNFT;
