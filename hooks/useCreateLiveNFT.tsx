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
  useAccount,
} from "wagmi";
import { parseEther } from "ethers/lib/utils";
import { createMetadata } from "utils/helpers";
import { post } from "utils/requests";
import { LiveNFT } from "context/createContext";
import factoryContract from "contracts/factory-abi";

const contractAddress = process.env.NEXT_PUBLIC_FACTORY_CONTRACT_ADDRESS ?? "";

const useCreateLiveNFT = () => {
  const {address} = useAccount();
  const context = React.useContext(CreateContext);
  if (!context) {
    throw "context requred to use this hook";
  }
  const [contractWriteEnabled, setContractWriteEnabled] = React.useState(false);
  const { liveNFT, setLiveNFT } = context;
  const [error, setError] = React.useState<string | undefined>();
  const {
    data: assetData,
    mutate: createStream,
    status: createStreamStatus,
    error: createStreamError,
  } = useCreateStream({ name: liveNFT.name });

  const {
    config,
    error: prepareContractWriteError,
    isSuccess: prepareContractWriteSuccess,
  } = usePrepareContractWrite({
    addressOrName: contractAddress,
    contractInterface: [...factoryContract],
    functionName: "createLiveNFT",
    args: [
      liveNFT.baseUri,
      liveNFT.name,
      liveNFT.description,
      10,
      liveNFT.price,
    ],
    enabled: contractWriteEnabled,
  });

  const {
    data,
    write,
    isLoading,
    isSuccess,
    status,
    error: contractWriteError,
  } = useContractWrite(config);

  const {
    status: writeTransactionStatus,
    error: txError,
    data: transactionData,
  } = useWaitForTransaction({
    hash: data?.hash,
  });

  React.useEffect(() => {
    if (createStreamStatus === "success") {
      if (!assetData) return;
      const metadata = createMetadata({
        name: liveNFT.name,
        description: liveNFT.description,
        LNFTId: assetData.id,
        playbackUrl: assetData?.playbackUrl,
        address: address ?? ""
      });
      post("/api/collection/uploadMetadata", metadata).then((res) => {
        setLiveNFT({ ...liveNFT, baseUri: res?.url });
      });
    }
    if (writeTransactionStatus === "success") {
      alert("success");
      console.log(transactionData);
      window.location.href = "/list";
    }
  }, [createStreamStatus, writeTransactionStatus]);

  React.useEffect(() => {
    if (prepareContractWriteSuccess) {
      write?.();
    }
  }, [prepareContractWriteSuccess]);

  React.useEffect(() => {
    if (txError) {
      setError(txError.message);
    }
    if (prepareContractWriteError) {
      setError(prepareContractWriteError.message);
    }
    if (createStreamError) {
      setError(createStreamError.message);
    }
    if (contractWriteError) {
      setError(contractWriteError.message);
    }
  }, [txError, prepareContractWriteError, createStreamError]);

  const deployContract = () => {
    setContractWriteEnabled(true);
    // write?.()
  };

  const handleSetData = (key: keyof LiveNFT, value: string) => {
    let parsedValue;
    if (key === "price") {
      parsedValue = parseEther(value);
    } else {
      parsedValue = value;
    }
    setLiveNFT({ ...liveNFT, [key]: parsedValue });
  };

  const handleCreateStream = () => {
    if (liveNFT.name !== "" && liveNFT.description !== "") {
      createStream && createStream();
    } else {
      setError("Fill all parameters");
    }
  };

  return {
    handleSetData,
    handleCreateStream,
    deployContract,
    error,
    isLoading:
      isLoading ||
      createStreamStatus === "loading" ||
      writeTransactionStatus === "loading",
  };
};

export default useCreateLiveNFT;
