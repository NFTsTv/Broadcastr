import { useState, useEffect } from "react";
import { useAccount, useContractRead } from "wagmi";
import factoryContract from "contracts/CastrFactory-abi";
import { ContractAddress } from "utils/constants";

const useCastrAccount = () => {
  const { address, isConnected, isDisconnected } = useAccount();
  const [castrAddress, setCastrAddress] = useState<string | null>(null);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const { data, isLoading, isSuccess, isError, refetch } = useContractRead({
    address: ContractAddress(),
    abi: factoryContract,
    functionName: "getCreatorChannels",
    args: [address],
  });

  useEffect(() => {
    if (isConnected) {
      refetch();
    }
  }, [isConnected, address]);

  useEffect(() => {
    if (isSuccess) {
      const readData = data as string[];
      if (readData.length > 0) {
        setCastrAddress(readData[0]);
      }
      setLoadingComplete(true);
    }
  }, [isSuccess, isError, data]);

  const isOwned = (address: string) => {
    if (isDisconnected) return false;
    const readData = data as string[];
    if (!readData) return false;
    return readData.includes(address);
  };

  return {
    castrAddress,
    isOwned,
    loadingComplete,
  };
};

export default useCastrAccount;
