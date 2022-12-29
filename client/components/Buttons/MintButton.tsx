import React from "react";
import Button from "./Button";
import {
  usePrepareContractWrite,
  useContractRead,
  useContractWrite,
  useAccount,
} from "wagmi";
import { BigNumber, ethers } from "ethers";
import LNFTcontractABI from "contracts/LNFTcontract-abi";
import { parseUnits } from "ethers/lib/utils";


const MintButton = ({ address }: { address: string }) => {
  const [mintLoading, setMintLoading] = React.useState(false);
  const { isConnected, address: userAddress } = useAccount();
  if (!address) return <></>;
  // get mintPrice from contract
  const { data: mintPrice } = useContractRead({
    addressOrName: address,
    contractInterface: LNFTcontractABI,
    functionName: "mintPrice",
    args: [],
  });

  console.log(mintPrice);

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
      console.log({ receipt });
    } catch (error) {
      console.error(error);
    } finally {
      setMintLoading(false);
    }
  };

  return (
    <Button onClick={onMintClick} isLoading={mintLoading}>
      Mint
    </Button>
  );
};

export default MintButton;
