import { useRef } from "react";
import useCastr from "hooks/useCastr";
import useWebRtmp from "hooks/useWebRtmp";
import VideoView, { VideoViewHandle } from "./VideoView";
import useAddressContext from "hooks/useAddressContext";
import Button from "components/Buttons/Button";
const WebcamView = () => {
  const { address: userAddress } = useAddressContext();

  const videoView = useRef<VideoViewHandle>(null);
  const { stream } = useCastr(userAddress);
  const { state, startStream } = useWebRtmp(videoView, stream?.streamKey);

  if (!userAddress) {
    return <div>Loading</div>;
  }

  return (
    <div className="flex flex-col w-full relative">
      <VideoView ref={videoView} />
      <div className="flex flex-row space-x-2 absolute bottom-0 flex-wrap justify-center items-center ">
        <Button onClick={startStream}>Start Stream</Button>
        <Button onClick={() => videoView.current?.disableVideo()}>
          Disable Video
        </Button>
        <Button onClick={() => videoView.current?.shareScreen()}>
          Share Screen
        </Button>
        <Button onClick={() => videoView.current?.switchCamera()}>
          Switch Camera
        </Button>
      </div>
    </div>
  );
};

export default WebcamView;
