import { LiveNFT } from "types/general";
import { Stream } from "@livepeer/react";
import UseObs from "./UseObs";
import UseWebcam from "./UseWebcam";
import UseTestStream from "./UseTestSignal";

export const GoLive = ({
  lnftData,
  stream,
  address,
}: {
  lnftData: LiveNFT;
  stream: Stream;
  address: string;
}) => {
  return (
    <>
      {stream.isActive ? (
        <h1 className="animate-pulse text-success">Stream is live!</h1>
      ) : (
        <>
          <h1>Go live on {lnftData.name}!</h1>
          <p>
            Stream directly into you LNFT using on of the following methods:
          </p>
          <div className="flex flex-col">
            <UseObs stream={stream} />
            {/* <UseWebcam address={address as string} /> */}
            <UseTestStream stream={stream} />
          </div>
        </>
      )}
    </>
  );
};
