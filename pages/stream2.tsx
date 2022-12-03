import React, { useEffect, useRef } from "react";
import { Client, WebSocketError } from "@livepeer/webrtmp-sdk";
import { useAccount } from "wagmi";

function App() {
  const videoEl = useRef<HTMLVideoElement | null>(null);
  const stream = useRef<MediaStream | null>(null);
  const [status, setStatus] = React.useState("");
  const { address } = useAccount();

  useEffect(() => {
    (async () => {
      if (!videoEl.current) {
        return;
      }
      videoEl.current.volume = 0;
      stream.current = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: { echoCancellation: true, noiseSuppression: true },
      });

      videoEl.current.srcObject = stream.current;
      videoEl.current.play();
    })();
  });

  const onButtonClick = async () => {
    setStatus("Connecting...");
    if (!videoEl.current || address === undefined) {
      alert("Please connect your wallet");
      return;
    }

    // //const allowed = await authenticate(address);
    // if (!allowed) {
    //   alert("You are not allowed to stream");
    //   return;
    // }

    if (!stream.current) {
      alert("Video stream was not started.");
      return;
    }

    const streamKey = "b74c-karq-889t-p0u5";

    const transport = "auto";
    const client = new Client({ transport });
    const session = client.cast(stream.current, streamKey);

    session.on("error", (err) => {
      let isTransient: boolean = false;
      if (err instanceof WebSocketError) {
        const { code } = err;
        isTransient = code === 106;
      }

      setStatus(isTransient ? "Reconnecting..." : "Disconnected");
    });

    session.on("open", () => {
      console.log("Stream started.");
      setStatus("Stream started; visit Livepeer Dashboard.");
    });

    session.on("close", () => {
      console.log("Stream stopped.");
    });
  };

  return (
    <div className="w-full h-screen">
      <video
        playsInline
        className="App-video"
        ref={videoEl}
        width={"100%"}
        height={"100%"}
      />
      <button className="btn btn-circle" onClick={onButtonClick}>
        Start
      </button>
      {status}
    </div>
  );
}

export default App;
