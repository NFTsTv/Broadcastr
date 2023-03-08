import ControlSideBar from "./ControlSideBar";
import Navbar from "components/Elements/Navbar";
import ViewOnPlatform from "components/Buttons/ViewOnPlatform";
import ShareButton from "components/Share/Button";
import NFTEmbed from "components/Elements/NFTEmbed";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const CastComponent = () => {
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
      <div className="flex h-full lg:flex-row flex-col-reverse">
        <ControlSideBar />
        <NFTEmbed chat={false} />
      </div>
    </>
  );
};

export default CastComponent;
