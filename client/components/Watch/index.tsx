import Navbar from "components/Elements/Navbar";
import ViewOnPlatform from "components/Buttons/ViewOnPlatform";
import ShareButton from "components/Share/Button";
import NFTEmbed from "components/Elements/NFTEmbed";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import BottomControlBar from "./BottomControlBar";
import ChatBar from "./ChatBar";

const WatchComponent = () => {
  return (
    <>
      <Navbar>
        <ViewOnPlatform />
        <ShareButton />
        <ConnectButton
          accountStatus={{
            smallScreen: "avatar",
            largeScreen: "full",
          }}
          showBalance={false}
        />
      </Navbar>
      <div className="flex flex-col lg:flex-row w-full h-full">
        <div className="md:h-full w-full flex flex-col">
          <NFTEmbed chat={false} />
          <BottomControlBar />
        </div>
        <ChatBar />
      </div>
    </>
  );
};

export default WatchComponent;
