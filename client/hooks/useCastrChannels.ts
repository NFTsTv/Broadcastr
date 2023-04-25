import { useState, useEffect } from "react";
import { useContractRead } from "wagmi";
import factoryContract from "contracts/CastrFactory-abi";
import { ContractAddress } from "utils/constants";
import test from "test.json";

const useCastrChannels = () => {
  const [castrChannels, setCastrChannels] = useState<string[]>([]);
  const [liveAddress, setLiveAddress] = useState<string[]>([]);

  const updateLiveAddress = (address: string) => {
    if (!liveAddress.includes(address)) {
      setLiveAddress([...liveAddress, address]);
    }
  };


  useEffect(() => {
    console.log("liveAddress", liveAddress);
    //put liveaddress at the top of castchannels and remove duplicates
    const orderedCastrChannels = [...castrChannels.filter((channel) => !liveAddress.includes(channel))];

    setCastrChannels([...liveAddress, ...orderedCastrChannels]);
  }, [liveAddress]);

  const { data, isLoading, isError } = useContractRead({
    abi: factoryContract,
    address: ContractAddress(),
    functionName: "getAllCastrs",
  });

  useEffect(() => {
    console.log(data)
    if (data) {
      setCastrChannels(data as string[]);
    }
  }, [data]);

  return {
    castrChannels,
    updateLiveAddress
  }
};

export default useCastrChannels;
