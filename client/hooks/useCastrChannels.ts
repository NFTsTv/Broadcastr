import { useState, useEffect } from "react";
import { useContractRead } from "wagmi";
import factoryContract from "contracts/CastrFactory-abi";
import { ContractAddress } from "utils/constants";
import test from "test.json";

const useCastrChannels = () => {
  const [castrChannels, setCastrChannels] = useState<string[]>(test);
  // const { data, isLoading, isError } = useContractRead({
  //   abi: factoryContract,
  //   address: ContractAddress(),
  //   functionName: "getAllCastrs",
  // });

  // useEffect(() => {
  //   if (data) {
  //     //setCastrChannels(data as string[]);
  //   }
  // }, [data]);

  return {
    castrChannels,
  }
};

export default useCastrChannels;
