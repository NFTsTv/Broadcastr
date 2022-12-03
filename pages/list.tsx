import type { NextPage } from "next";
import React from "react";
import Container from "../components/container";
import { useAccount, useContractRead } from "wagmi";
import NftCard from "../components/NftCard";

import contractInterface from "../contract-abi.json";
const contractAddress = "0x7278AE17fdb96f8033F8625f201107Ed0C173c24";
const List: NextPage = () => {
  const { address } = useAccount();

  const { data, error, isError, isLoading, status } = useContractRead({
    addressOrName: contractAddress,
    contractInterface: contractInterface,
    functionName: "getCreatorChannels",
    args: [address],
  });

  return (
    <div className="p-5 space-y-4 flex flex-col w-full max-w-sm">
      <span className="text-4xl bold mb-4">NFTS are live!</span>
      {isLoading ? (
        <p>Loading...</p>
      ) : ( 
        <div className="flex flex-col w-full space-y-5">
          {data?.map((address: string) => (
            <NftCard address={address} />
          ))}
        </div>
      )}
    </div>
  );
};

export default List;
