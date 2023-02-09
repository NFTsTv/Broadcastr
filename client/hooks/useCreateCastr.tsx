import { CreateContext } from "context/createContext";
import { useContext, useEffect, useState } from "react";
import { useCreateStream } from "@livepeer/react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  useAccount,
} from "wagmi";

import { createMetadata } from "utils/helpers";
import { post } from "utils/requests";
import CastrFactoryABI from "contracts/CastrFactory-abi";
import { parseEther } from "ethers/lib/utils";
import { ContractAddress } from "utils/constants";


const useCreateCastr = () => {
  const { address } = useAccount();
  const context = useContext(CreateContext);
  const [createError, setError] = useState<string | undefined>();
  if (!context) {
    throw "context requred to use this hook";
  }
  const { Castr, handleSetData, validateFormData } = context;
  const [isLoadingRequest, setIsLoadingRequest] = useState(false);

  const {
    data: assetData,
    mutate: createStream,
    status: createStreamStatus,
    error: createStreamError,
  } = useCreateStream({ name: Castr.name, record: true });

  const { config, isSuccess: prepareContractWriteSuccess } =
    usePrepareContractWrite({
      addressOrName: ContractAddress,
      contractInterface: [...CastrFactoryABI],
      functionName: "createCastr",
      args: validateFormData()
        ? [
          Castr.baseUri,
          Castr.name,
          Castr.description,
          Castr.limitedSupply,
          Number(Castr.totalSupply),
          parseEther(Castr.price),
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

  useEffect(() => {
    if (createStreamStatus === "success") {
      if (!assetData) return;
      setIsLoadingRequest(true);
      const metadata = createMetadata({
        name: Castr.name,
        description: Castr.description,
        CastrId: assetData.id,
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
      window.location.href = "/";
    }
  }, [createStreamStatus, writeTransactionStatus]);

  useEffect(() => {
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
    if (Castr.name !== "" && Castr.description !== "") {
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

export default useCreateCastr;
