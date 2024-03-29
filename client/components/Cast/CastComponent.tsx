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
    <div className="relative w-full aspect-w-16 aspect-h-9 overflow-hidden">
      <video controls className="absolute left-0 w-full h-full object-contain" onEnded={handleVideoEnd}>
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
    </div>
  );
};

const PlayerArea = ({
  showTutorial,
  showWebcam,
  setShowTutorial,
}: {
  showTutorial: boolean;
  showWebcam: boolean;
  setShowTutorial: (value: boolean) => void;
}) => {
  if (showTutorial) {
    return <TutorialVideo setIsDone={setShowTutorial} />;
  } else if (showWebcam) {
    return <WebcamView />;
  } else {
    return <NFTEmbed chat={true} />;
  }
};

const CastComponent = () => {
  const [showTutorial, setShowTutorial] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);
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
      <div className="flex h-full lg:flex-row flex-col-reverse relative">
        <ControlSideBar
          setShowTutorial={setShowTutorial}
          setShowWebcam={setShowWebcam}
        />
        <PlayerArea
          showTutorial={showTutorial}
          showWebcam={showWebcam}
          setShowTutorial={setShowTutorial}
        />
      </div>
    </>
  );
};

export default CastComponent;
