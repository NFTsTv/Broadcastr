// useWebRtmp.js
import { useState, useEffect, useRef, MutableRefObject } from "react";
import { Client } from "@livepeer/webrtmp-sdk";
import { VideoViewHandle } from "components/Webcam/VideoView";

interface State {
  isStreaming: boolean;
  streamError: string | null;
}

function useWebRtmp(
  videoView: MutableRefObject<VideoViewHandle | null>,
  streamKey: string | undefined
) {
  const [state, setState] = useState<State>({
    isStreaming: false,
    streamError: null,
  });
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    clientRef.current = new Client({
      transport: "wrtc",
    });
    // return () => {
    //   if (clientRef.current && state.isStreaming) {
    //     stopStream();
    //   }
    // };
  }, []);

  const startStream = async () => {
    if (!videoView.current) {
      alert("Video view not initialized.");
      return;
    }

    const mediaStream = videoView.current.getMediaStream();
    if (!mediaStream) {
      alert("Video stream was not started.");
      return;
    }

    if (!streamKey) {
      alert("Invalid streamKey.");
      return;
    }

    if (!clientRef.current) {
      alert("Client not initialized.");
      return;
    }

    const session = clientRef.current.cast(mediaStream, streamKey);

    session.on("open", () => {
      console.log("Stream started.");
      alert("Stream started; visit Livepeer Dashboard.");
      setState({ isStreaming: true, streamError: null });
    });

    session.on("close", () => {
      console.log("Stream stopped.");
      setState({ isStreaming: false, streamError: null });
    });

    session.on("error", (err) => {
      console.log("Stream error.", err.message);
      setState({ isStreaming: false, streamError: err.message });
    });
  };

  // const stopStream = () => {
  //   if (clientRef.current) {
  //     clientRef.current.stop();
  //   }
  // };

  return {
    state,
    startStream,
  };
}

export default useWebRtmp;
