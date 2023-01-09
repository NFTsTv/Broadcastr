import React from "react";
import MintButton from "./MintButton";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ViewContext } from "context/viewContext";
import Button from "./Button";
import ShareButton from "components/Share/Button";
const UserInteractionBar = () => {
  const { isConnected } = useAccount();
  const context = React.useContext(ViewContext);
  if (!context) {
    return <div>loading</div>;
  }

  const { address, displayVodContent, setDisplayVodContent, sessions } =
    context;
  return (
    <div className="flex flex-row flex-wrap space-x-2 space-y-2 m-3">
      {isConnected ? <MintButton address={address} /> : <ConnectButton />}
      {sessions && sessions.length > 0 && (
        <Button
          styles="btn-outline btn-sm btn-secondary"
          onClick={() => setDisplayVodContent(!displayVodContent)}
        >
          {displayVodContent ? "Live Stream" : "VOD Content"}
        </Button>
      )}
      <ShareButton />
    </div>
  );
};

export default UserInteractionBar;
