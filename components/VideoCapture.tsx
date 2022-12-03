import React, { useRef } from "react";
import { Client, WebSocketError } from "@livepeer/webrtmp-sdk";
import { useAccount } from "wagmi";
import { Camera } from "components/Camera";

interface Props {
  streamKey: string;
}

const VideoCapture = ({ streamKey }: Props) => {
  const camera = useRef<any>(null);
  const [status, setStatus] = React.useState("test");
  const { address } = useAccount();
  console.log(status);
  if (!streamKey) {
    return <div>Stream key not provided</div>;
  }

  const onButtonClick = async () => {
    setStatus("Connecting...");
    if (!camera.current) {
      alert("Camera not found");
      return;
    }
    console.log("camera.current", camera.current);
    // ts-ignore
    const stream = camera.current?.takeVideo();
    if (!stream) {
      alert("Video stream was not started.");
      return;
    }

    const transport = "auto";
    const client = new Client({ transport });
    const session = client.cast(stream, streamKey);
    console.log(session);
    session.on("error", (err) => {
      let isTransient: boolean = false;
      if (err instanceof WebSocketError) {
        const { code } = err;
        isTransient = code === 106;
        console.log("WebSocket error", code, isTransient);
      }
      console.error("Error: ", err);
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
    <div>
      <Camera
        ref={camera}
        errorMessages={{
          noCameraAccessible: "No camera found.",
          permissionDenied: "No camera permission.",
        }}
      />
      <button className="absolute bg-white" onClick={onButtonClick}>
        Start Stream {status}
      </button>
    </div>
  );
};

export default VideoCapture;
