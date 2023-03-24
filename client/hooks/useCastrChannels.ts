import { useState, useEffect } from "react";
import { useContractRead } from "wagmi";
import factoryContract from "contracts/CastrFactory-abi";
import { ContractAddress } from "utils/constants";

interface CastrChannel {
  uri: string;
  name: string;
  description: string;
  limitedSupply: boolean;
  totalSupply: number;
  mintPrice: number;
}

const useCastrChannels = () => {
  const [castrChannels, setCastrChannels] = useState<CastrChannel[]>([]);

  const { data } = useContractRead({
    abi: factoryContract,
    address: ContractAddress(),
    functionName: "Castrs",
    args: ["0"],
  });

  useEffect(() => {
    if (data) {
      console.log("data", data);
    }
  });

  return castrChannels;
};

export default useCastrChannels;
