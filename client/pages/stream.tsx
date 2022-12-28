import React, { useRef } from "react";
import VideoView, { VideoViewHanlde } from "components/VideoView";
import { useRouter } from "next/router";
import { useLivenft } from "hooks/useLiveNFT";
import WebcamControl from "components/webCamControl";
// import useWebRtmp from "hooks/useWebRtmp";
import WHIPClient from "services/cloudfareWebRtc/WHIPClient";
const LiveStreamState = () => {
  const videoView = useRef<VideoViewHanlde | null>(null);
  const ref = useRef<HTMLVideoElement | null>(null);
  const router = useRouter();
  const [client, setClient] = React.useState<any>(null);
  const { address } = router.query;
  // const { stream } = useLivenft(address as string);
  // const { onStart, state } = useWebRtmp(videoView, stream?.streamKey);
  const url =
    "https://customer-8l37l963jl79x3vz.cloudflarestream.com/5a308c2a0b2c9b0000dc43c5d4dabf99k40fa6724bc3fdbdc32caefce55ddbc2a/webRTC/publish"; // add the webRTC URL from your live input here

  const onStart = () => {
    if (!videoView.current) {
      return;
    }
    const mediaStream = videoView.current.getMediaStream();
    if (!mediaStream) return;

    const a = new WHIPClient(url, mediaStream);
    setClient(a)
  };

  const disableVideo = () => {
    if (videoView.current) {
      videoView.current.disableVideo();
    }
  };

  const switchCamera = () => {
    if (videoView.current) {
      videoView.current.switchCamera();
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <VideoView ref={videoView} />
      <WebcamControl
        goLive={onStart}
        disableVideo={disableVideo}
        switchCamera={switchCamera}
        status={"idle"}
      />
    </div>
  );
};

export default LiveStreamState;
