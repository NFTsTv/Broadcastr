import { MutableRefObject, useEffect, useReducer, useState } from "react";
import { CastSession, Client } from "@livepeer/webrtmp-sdk";
import { VideoViewHanlde } from "components/Webcam/VideoView";

export type State = {
  state: "loading" | "error" | "live" | "idle";
};

type Action =
  | { type: "LOADING" }
  | { type: "ERROR" }
  | { type: "LIVE" }
  | { type: "STOP" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "LOADING":
      return { state: "loading" };
    case "ERROR":
      return { state: "error" };
    case "LIVE":
      return { state: "live" };
    case "STOP":
      return { state: "idle" };
  }
}

export const useWebRtmp = (
  videoView: MutableRefObject<VideoViewHanlde | null>,
  streamKey: string | undefined
) => {
  const [state, dispatch] = useReducer(reducer, { state: "idle" });
  const [session, setSession] = useState<CastSession | null>(null);
  const client = new Client({ transport: "auto" });

  useEffect(() => {
    if (session) {
      session.on("open", () => {
        console.log("Stream started; visit Livepeer Dashboard.");
        dispatch({ type: "LIVE" });
      });

      session.on("close", () => {
        console.log("Stream stopped.");
        dispatch({ type: "STOP" });
      });

      session.on("error", (err) => {
        alert("Stream error." + err.message);
        dispatch({ type: "ERROR" });
      });
    }

    return () => {
      if (session) {
        session.close();
      }
    };
  }, [session]);

  const onStart = () => {
    // Start livestreaming code here...
    if (!videoView.current) {
      alert("Video stream was not started.");
      return;
    }

    const mediaStream = videoView.current.getMediaStream();

    if (!mediaStream) {
      alert("no media stream");
      return;
    }

    if (!streamKey) {
      alert("Video stream was not started.");

      return;
    }

    const session = client.cast(mediaStream, streamKey);
    console.log(session);
    setSession(session);
  };

  const onStop = () => {
    if (session) {
      session.close();
    }
  };

  return {
    state,
    onStart,
    onStop
  }
};


export default useWebRtmp;