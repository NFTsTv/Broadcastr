import React, { useRef } from "react";
import VideoView, { VideoViewHanlde } from "components/VideoView";
import { useRouter } from "next/router";
import { useLivenft } from "hooks/useLiveNFT";
import WebcamControl from "components/webCamControl";
import useWebRtmp from "hooks/useWebRtmp";

const LiveStreamState = () => {
  const videoView = useRef<VideoViewHanlde | null>(null);
  const router = useRouter();
  const { address } = router.query;
  const { stream } = useLivenft(address as string);
  const { onStart, state } = useWebRtmp(videoView, stream?.streamKey);

  if (!address) {
    return <div>loading</div>;
  }

  const disableVideo = () => {
    if(videoView.current){
      videoView.current.disableVideo()
    }
  }

  const switchCamera = () => {
    if(videoView.current){
      videoView.current.switchCamera()
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <VideoView ref={videoView} />
      <WebcamControl
        goLive={onStart}
        disableVideo={disableVideo}
        switchCamera={switchCamera}
        status={state.state}
      />
    </div>
  );
};

export default LiveStreamState;
