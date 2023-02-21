import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ReactNode } from "react";

const IsConnectedButton = ({ children }: { children: ReactNode }) => {
  const { isConnected } = useAccount();

  return isConnected ? <>{children}</> : <ConnectButton />;
};

export default IsConnectedButton;
