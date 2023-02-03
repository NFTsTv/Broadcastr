import type { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import useLiveNFT from "hooks/useLiveNFT";
import ViewComponent from "components/Watch";
import { ViewContextProvider } from "context/viewContext";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import WebcamView from "components/Webcam";
import { GoLive } from "components/Cast/GoliveButtons";
import StreamDetails from "components/StreamDetails";
const Cast: NextPage = () => {
  const router = useRouter();
  const { address } = router.query;
  const { stream, lnftData } = useLiveNFT(address as string);
  const [useWebcam, setUseWebcam] = useState(false);
  if (!stream || !address || !lnftData) return <div>Loading...</div>;

  return (
    <div className="flex h-full lg:flex-row flex-col-reverse">
      <div className="flex flex-col p-5 space-y-5 h-2/3 lg:h-full lg:w-1/4 relative overflow-auto">
        <ConnectButton
          accountStatus={{
            smallScreen: "avatar",
            largeScreen: "full",
          }}
          showBalance={false}
        />
        <GoLive
          address={address as string}
          stream={stream}
          lnftData={lnftData}
        />
        <StreamDetails address={address as string} details={lnftData} />
      </div>
      <div className="flex flex-col h-1/3 lg:w-3/4 lg:h-full border-1">
        <ViewContextProvider address={address as string}>
          {useWebcam ? (
            <WebcamView address={address as string} />
          ) : (
            <ViewComponent />
          )}
        </ViewContextProvider>
      </div>
    </div>
  );
};

export default Cast;
