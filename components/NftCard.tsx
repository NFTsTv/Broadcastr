import type { NextPage } from "next";
import React from "react";
import Container from "../components/container";
import { useAccount, useContractRead, useContract, useContractReads } from "wagmi";
import { getNFTs } from "../services/collections";
import { Lnft } from "../types/general";

import contractInterface from "../LNFTcontract-abi.json";
const contractAddress = "0xbc77b332d56d54A0454De880bDFf7e1df28ea450"


interface Props {
  address: string
}



const NftCard = ({ ...props }: Props) => {

  const [lnft, setLnft] = React.useState<Lnft>();

  const { data, error, isError, isLoading, status }  = useContractRead({
    addressOrName: props.address,
    contractInterface: contractInterface,
    functionName: "baseTokenURI",
  });


  React.useEffect(() => {
    console.log(data)
  }, [data]);


  return (<div></div>)

}

export default NftCard;