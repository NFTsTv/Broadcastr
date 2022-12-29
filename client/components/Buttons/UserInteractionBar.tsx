import React from "react";
import MintButton from "./MintButton";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const UserInteractionBar = ({ address }: { address: string }) => {
  const { isConnected } = useAccount();
  console.log(isConnected)
  return (
    <div className="flex justify-center m-3">
      {isConnected ? <MintButton address={address} /> : <ConnectButton />}
    </div>
  );
};

export default UserInteractionBar;
