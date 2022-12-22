import type { NextPage } from "next";
import React from "react";
import { useAccount, useContractRead } from "wagmi";
import NftCard from "components/NftCard";

import factoryContract from "contracts/factory-abi";
const contractAddress = process.env.NEXT_PUBLIC_FACTORY_CONTRACT_ADDRESS ?? "";


const List: NextPage = () => {
  const { address } = useAccount();

  const { data, error, isError, isLoading, status } = useContractRead({
    addressOrName: contractAddress,
    contractInterface: factoryContract,
    functionName: "getCreatorChannels",
    args: [address],
  });

  return (
    <div className="p-5 space-y-4 flex flex-col w-full">
      <span className="text-4xl bold mb-4">NFTS are live!</span>
      {isLoading ? (
        <p>Loading...</p>
      ) : ( 
        <div className="flex flex-col w-full space-y-5">
          {data?.map((address: string) => (
            <NftCard  address={address} />
          ))}
        </div>
      )}
    </div>
  );
};

export default List;
