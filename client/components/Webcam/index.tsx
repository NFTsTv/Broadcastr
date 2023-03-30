import { useRef } from "react";
import useCastr from "hooks/useCastr";
import useWebRtmp from "hooks/useWebRtmp";
import VideoView, { VideoViewHandle } from "./VideoView";
import useAddressContext from "hooks/useAddressContext";
import Controls from "./Controls";
import ChatOverlay from "components/Watch/ChatOverlay";
const WebcamView = () => {
  const { address: userAddress } = useAddressContext();

  const videoView = useRef<VideoViewHandle>(null);
  const { stream } = useCastr(userAddress);
  const { state, startStream } = useWebRtmp(videoView, stream?.streamKey);

  if (!userAddress) {
    return <div>Loading</div>;
  }

  return (
    <div className="flex flex-col w-full absolute h-screen z-50 lg:relative ">
      <VideoView ref={videoView} />
      <ChatOverlay />
      <Controls
        videoView={videoView}
        startStream={startStream}
        state={state.isStreaming ? "live" : "idle"}
      />
    </div>
  );
};

export default WebcamView;
