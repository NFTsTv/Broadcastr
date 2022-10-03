import React, { useEffect, useRef } from "react";
import { Client } from "@livepeer/webrtmp-sdk";
import { authenticate } from "../services/collections";
import { useAccount } from "wagmi";

function App() {
  const videoEl = useRef<HTMLVideoElement | null>(null);
  const stream = useRef<MediaStream | null>(null);
  const { address } = useAccount();

  useEffect(() => {
    (async () => {
      if (!videoEl.current) {
        return;
      }
      videoEl.current.volume = 0;
      stream.current = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      videoEl.current.srcObject = stream.current;
      videoEl.current.play();
    })();
  });

  const onButtonClick = async () => {
    if (!videoEl.current || address === undefined) {
      alert("Please connect your wallet");
      return;
    }

    const allowed = await authenticate(address);
    if (!allowed) {
      alert("You are not allowed to stream");
      return;
    }

    if (!stream.current) {
      alert("Video stream was not started.");
      return;
    }

    const streamKey = "213b-z858-x4jm-4xmf";

    const client = new Client();

    const session = client.cast(stream.current, streamKey);

    session.on("open", () => {
      console.log("Stream started.");
      alert("Stream started; visit Livepeer Dashboard.");
    });

    session.on("close", () => {
      console.log("Stream stopped.");
    });

    session.on("error", (err) => {
      console.log("Stream error.", err.message);
    });
  };

  return (
    <div className="w-full h-screen">
      <video
        className="App-video"
        ref={videoEl}
        width={"100%"}
        height={"100%"}
      />
      <button className="btn btn-circle" onClick={onButtonClick}>
        Start
      </button>
    </div>
  );
}

export default App;
