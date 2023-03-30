import Navbar from "components/Elements/Navbar";
import ViewOnPlatform from "components/Buttons/ViewOnPlatform";
import ShareButton from "components/Share/Button";
import NFTEmbed from "components/Elements/NFTEmbed";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import BottomControlBar from "./BottomControlBar";
import ChatBar from "./ChatBar";
import GoToChannel from "components/Buttons/GoToChannel";
const WatchComponent = () => {
  return (
    <>
      <Navbar>
        <GoToChannel />
        <ViewOnPlatform />
        <ShareButton />
        <ConnectButton
          accountStatus={{
            smallScreen: "full",
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
