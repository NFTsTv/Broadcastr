import { useState } from "react";
import Button from "./Button";
import { useContractRead, useContractWrite, useAccount, Address } from "wagmi";
import { ethers } from "ethers";
import CastrABI from "contracts/Castr-abi";

const MintButton = ({ address }: { address: string }) => {
  const [mintLoading, setMintLoading] = useState(false);
  const { address: userAddress, isConnected } = useAccount();
  const { data } = useContractRead({
    address: address as Address,
    abi: CastrABI,
    functionName: "mintPrice",
    args: [],
  });

  const mintPrice = data as ethers.BigNumber;
  const { writeAsync: mint, error: mintError } = useContractWrite({
    address: address as Address,
    abi: CastrABI,
    functionName: "subscribe",
    args: [userAddress],
  });

  const onMintClick = async () => {
    if (!isConnected) alert("Please connect your wallet");
    try {
      const tx = await mint();
    } catch (error) {
      console.error(error);
    } finally {
      setMintLoading(false);
    }
  };

  return (
    <Button
      styles={"btn-primary"}
      onClick={onMintClick}
      isLoading={mintLoading}
    >
      <span className="md:hidden">SUBSCRIBE</span>
      <span className="hidden md:block">
        SUBSCRIBE for {ethers.utils.formatEther(mintPrice ? mintPrice : 0)}{" "}
        MATIC
      </span>
    </Button>
  );
};

export default MintButton;
