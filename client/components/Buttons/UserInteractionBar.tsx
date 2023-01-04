import React from "react";
import MintButton from "./MintButton";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ViewContext } from "context/viewContext";
import Button from "./Button";
const UserInteractionBar = () => {
  const { isConnected } = useAccount();
  const context = React.useContext(ViewContext);
  if (!context) {
    return <div>loading</div>;
  }
  const { address, displayVodContent, setDisplayVodContent } = context;
  return (
    <div className="flex flex-row space-x-2 m-3 justify-center">
      {isConnected ? <MintButton address={address} /> : <ConnectButton />}
      {displayVodContent ? (
        <Button onClick={() => setDisplayVodContent(false)}>
          View Live Stream
        </Button>
      ) : (
        <Button onClick={() => setDisplayVodContent(true)}>
          View VOD Content
        </Button>
      )}
    </div>
  );
};

export default UserInteractionBar;
