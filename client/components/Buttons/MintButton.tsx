import { useState } from "react";
import Button from "./Button";
import {
  useContractRead,
  useContractWrite,
  useAccount,
} from "wagmi";
import { ethers } from "ethers";
import CastrABI from "contracts/Castr-abi";

const MintButton = ({ address }: { address: string }) => {
  const [mintLoading, setMintLoading] = useState(false);
  const { address: userAddress } = useAccount();
  const { data: mintPrice } = useContractRead({
    addressOrName: address,
    contractInterface: CastrABI,
    functionName: "mintPrice",
    args: [],
  });

  const { writeAsync: mint, error: mintError } = useContractWrite({
    addressOrName: address,
    contractInterface: CastrABI,
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
      Subscribre for {ethers.utils.formatEther(mintPrice ? mintPrice : 0)} MATIC
    </Button>
  );
};

export default MintButton;
