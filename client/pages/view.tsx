import React from "react";
import WHEPClient from "services/cloudfareWebRtc/WHEPClient"; // an example WHEP client, see https://github.com/cloudflare/templates/tree/main/stream/webrtc/src/WHEPClient.ts

const View = () => {
  // Add a <video> element to the HTML page this code runs in:
  // <video id="output-video" autoplay muted></video>
  const ref = React.useRef<HTMLVideoElement>(null);
  const [client, setClient] = React.useState<any>(null)
  const url =
    "https://customer-8l37l963jl79x3vz.cloudflarestream.com/40fa6724bc3fdbdc32caefce55ddbc2a/webRTC/play"; // add the webRTCPlayback URL from your live input here
  React.useEffect(() => {
    if (ref.current && !client) {
      const client = new WHEPClient(url, ref.current);
      setClient(client)
    }
    if(ref.current?.srcObject) {
      console.log(ref.current.srcObject)
      ref.current.play()
    }
  }, [ref]);

  return (
    <video width={"100%"} height="100%" controls ref={ref}>
    </video>
  );
};

export default View;
