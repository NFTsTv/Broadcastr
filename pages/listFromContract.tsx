import type { NextPage } from "next";
import React from "react";
import Container from "../components/container";
import { useAccount, useContractRead } from "wagmi";
import NftCard from "../components/NftCard";

import contractInterface from "../contract-abi.json";
const contractAddress = "0x7278AE17fdb96f8033F8625f201107Ed0C173c24"
const List: NextPage = () => {
  const { address } = useAccount();

  const { data, error, isError, isLoading, status } = useContractRead({
    addressOrName: contractAddress,
    contractInterface: contractInterface,
    functionName: "getCreatorChannels",
    args: [address],
  });


  return (
    <Container>
      <h1 className="text-4xl font-bold">NFTS are live</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col overflow-y">
          {data?.map((address: string) => (
            <NftCard address={address} />
          ))}

        </div>
      )}
    </Container>
  );
};

export default List;
