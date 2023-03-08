import { useState, useEffect } from "react";
import { useAccount, useContractRead } from "wagmi";
import factoryContract from "contracts/CastrFactory-abi";
import { ContractAddress } from "utils/constants";

const useCastrAccount = () => {
  const { address, isConnected } = useAccount();
  const [castrAddress, setCastrAddress] = useState<string | null>(null);
  const [loadingComplete, setLoadingComplete] = useState(false);

  const { data, isLoading, isSuccess, isError } = useContractRead({
    address: ContractAddress,
    abi: factoryContract,
    functionName: "getCreatorChannels",
    args: [address],
  });

  useEffect(() => {
    if (isSuccess) {
      const readData = data as string[];
      if (readData.length > 0) {
        setCastrAddress(readData[0]);
      }
    }
    setLoadingComplete(true);
  }, [isSuccess]);

  const isOwned = (address: string) => {
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
