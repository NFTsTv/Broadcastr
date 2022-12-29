import React, { useRef } from "react";
import VideoView, { VideoViewHanlde } from "components/VideoView";
import { useRouter } from "next/router";
import { useLivenft } from "hooks/useLiveNFT";
import WebcamControl from "components/webCamControl";
import useWebRtmp from "hooks/useWebRtmp";
import {
  AgoraVideoPlayer,
  createClient,
  createMicrophoneAndCameraTracks,
} from "agora-rtc-react";

const LiveStreamState = () => {
  const videoView = useRef<VideoViewHanlde | null>(null);
  const router = useRouter();
  
  const config = { mode: "rtc", codec: "vp8" };

  const useClient = createClient(config);
  const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  return (
    ready && (
      <AgoraVideoPlayer
        videoTrack={tracks[1]}
        style={{ height: "100%", width: "100%" }}
      />
    )
  );
};

export default LiveStreamState;
