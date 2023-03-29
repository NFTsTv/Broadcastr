import ControlSideBar from "./ControlSideBar";
import Navbar from "components/Elements/Navbar";
import ViewOnPlatform from "components/Buttons/ViewOnPlatform";
import ShareButton from "components/Share/Button";
import NFTEmbed from "components/Elements/NFTEmbed";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import WebcamView from "components/Webcam";
const TutorialVideo = ({
  setIsDone,
}: {
  setIsDone: (isDone: boolean) => void;
}) => {
  const handleVideoEnd = () => {
    setIsDone(false);
  };

  return (
    <video controls className="w-full h-full" onEnded={handleVideoEnd}>
      <source
        src="https://lp-playback.com/hls/b095xdn4do0nxnv3/1080p0/ebbdcbhe_1080p0.mp4"
        type="video/mp4"
      ></source>
      <source
        src="https://lp-playback.com/hls/b095xdn4do0nxnv3/720p0/ebbdcbhe_720p0.mp4"
        type="video/mp4"
      ></source>
      <source
        src="https://lp-playback.com/hls/b095xdn4do0nxnv3/360p0/ebbdcbhe_360p0.mp4"
        type="video/mp4"
      ></source>
    </video>
  );
};

const CastComponent = () => {
  const [showTutorial, setShowTutorial] = useState(false);

  return (
    <>
      <Navbar>
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
      <div className="flex h-full lg:flex-row flex-col-reverse">
        <ControlSideBar setShowTutorial={setShowTutorial} />
        {/* {showTutorial ? (
          <TutorialVideo setIsDone={setShowTutorial} />
        ) : (
          <NFTEmbed chat={true} />
        )} */}
        <WebcamView />
      </div>
    </>
  );
};

export default CastComponent;
