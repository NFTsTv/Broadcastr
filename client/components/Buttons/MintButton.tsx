import React from "react";
import Button from "./Button";
import {
  usePrepareContractWrite,
  useContractRead,
  useContractWrite,
  useAccount,
} from "wagmi";
import { ethers } from "ethers";
import LNFTcontractABI from "contracts/LNFTcontract-abi";


const MintButton = ({ address }: { address: string }) => {
  const [mintLoading, setMintLoading] = React.useState(false);
  const { isConnected, address: userAddress } = useAccount();
  // get mintPrice from contract
  const { data: mintPrice } = useContractRead({
    addressOrName: address,
    contractInterface: LNFTcontractABI,
    functionName: "mintPrice",
    args: [],
  });

  const { writeAsync: mint, error: mintError } = useContractWrite({
    addressOrName: address,
    contractInterface: LNFTcontractABI,
    functionName: "mintTo",
    mode: "recklesslyUnprepared",
    args: [
      userAddress,
      {
        value: mintPrice,
      },
    ],
  });

  const onMintClick = async () => {
    try {
      const tx = await mint();
      const receipt = await tx.wait();
    } catch (error) {
      console.error(error);
    } finally {
      setMintLoading(false);
    }
  };

  return (
    <Button styles={"ml-2 btn-primary"} onClick={onMintClick} isLoading={mintLoading}>
      Subscribre for {ethers.utils.formatEther(mintPrice ? mintPrice: 0)} ETH
    </Button>
  );
};

export default MintButton;
