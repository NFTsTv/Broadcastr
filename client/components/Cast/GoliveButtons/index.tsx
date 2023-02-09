import { Castr } from "types/general";
import { Stream } from "@livepeer/react";
import UseObs from "./UseObs";
import UseTestStream from "./UseTestSignal";

// In the works...
import UseWebcam from "./UseWebcam";

export const GoLive = ({
  CastrData,
  stream,
  address,
}: {
  CastrData: Castr;
  stream: Stream;
  address: string;
}) => {
  return (
    <>
      {stream.isActive ? (
        <h1 className="animate-pulse text-success">Stream is live!</h1>
      ) : (
        <>
          <h1>Go live on {CastrData.name}!</h1>
          <p>
            Stream directly into your Castr using on of the following methods:
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
