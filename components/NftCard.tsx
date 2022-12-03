import type { NextPage } from "next";
import React from "react";
import Container from "../components/container";
import {
  useAccount,
  useContractRead,
  useContract,
  useContractReads,
} from "wagmi";

import contractInterface from "../LNFTcontract-abi.json";
import Link from "next/link";
const contractAddress = "0xbc77b332d56d54A0454De880bDFf7e1df28ea450";

interface Props {
  address: string;
}

const NftCard = ({ ...props }: Props) => {
  const { data, error, isError, isLoading, status } = useContractRead({
    addressOrName: props.address,
    contractInterface: contractInterface,
    functionName: "baseTokenURI",
  });

  React.useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="card w-full bg-primary text-primary-content box-border">
      <div className="card-body">
        <h2 className="card-title">Card title!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <Link href={`/stream?address=${props.address}`}>
            <button className="btn">Buy Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NftCard;
