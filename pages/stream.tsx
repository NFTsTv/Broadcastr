import React, { useRef } from "react";
import VideoView, { VideoViewHanlde } from "components/VideoView";
import { CastSession, Client } from "@livepeer/webrtmp-sdk";
import { useRouter } from "next/router";
import { useLivenft } from "hooks/useLivenft";
type State = {
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

const LiveStreamState = () => {
  const [state, dispatch] = React.useReducer(reducer, { state: "idle" });
  const [session, setSession] = React.useState<CastSession | null>(null);
  const videoView = useRef<VideoViewHanlde | null>(null);
  const client = new Client({ transport: "auto" });
  const router = useRouter();
  const { address } = router.query;
  const {data} = useLivenft(address);

  React.useEffect(() => {
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

  if (!address) {
    return <div>loading</div>;
  }

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

    // if (!streamKey) {
    //   alert('Invalid streamKey.')
    //   return
    // }

    const session = client.cast(mediaStream, "213b-z858-x4jm-4xmf");
    setSession(session);
  };

  const onStop = () => {
    // Stop livestreaming code here...
    if (session) {
      session.close();
    }
  };

  const disableVideo = () => {
    if (!videoView.current) {
      return;
    }
    videoView.current.disableVideo();
  };

  const switchCamera = () => {
    if (!videoView.current) {
      return;
    }

    videoView.current.switchCamera();
  };

  return (
    <div className="flex flex-col h-screen">
      <VideoView ref={videoView} />
      <div className="flex flex-row absolute bottom-0 justify-center left-0 right-0">
        <div className="text-center mt-3 mb-3">
          {state.state === "live" ? (
            <div className="btn bg-red-600 text-white" onClick={onStop}>
              stop
            </div>
          ) : (
            <div className="btn bg-green-600 text-white" onClick={onStart}>
              Start
            </div>
          )}
        </div>
        <div className="text-center mt-3 mb-3">
          <button className="btn bg-blue-600 text-white" onClick={disableVideo}>
            Disable Video
          </button>
          <button
            className="btn bg-purple-600 text-white"
            onClick={switchCamera}
          >
            Switch Camera
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveStreamState;
