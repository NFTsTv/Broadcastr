import { useRef } from "react";
import useLiveNFT from "hooks/useLiveNFT";
import useWebRtmp from "hooks/useWebRtmp";
import VideoView, { VideoViewHanlde } from "./VideoView";
import WebcamControl from "./webCamControl";

const WebcamView = ({ address }: { address: string }) => {
  const videoView = useRef<VideoViewHanlde | null>(null);
  const { stream } = useLiveNFT(address as string);
  const { onStart, state } = useWebRtmp(videoView, stream?.streamKey);

  if (!address) {
    return <div>loading</div>;
  }

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
        status={state.state}
      />
    </div>
  );
};

export default WebcamView;
