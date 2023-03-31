import { Castr } from "types/general";
import { Stream } from "@livepeer/react";
import UseObs from "./UseObs";
import Button from "components/Buttons/Button";

export const GoLive = ({
  CastrData,
  stream,
  setShowTutorial,
  setShowWebcam,
}: {
  CastrData: Castr;
  stream: Stream;
  address: string;
  setShowTutorial: (value: boolean) => void;
  setShowWebcam: (value: boolean) => void;
}) => {
  return (
    <>
      {stream.isActive ? (
        <h1 className="animate-pulse text-success">Stream is live!</h1>
      ) : (
        <>
          <h1>Go live on {CastrData.name}!</h1>
          <p>Stream directly into your Castr using one of the follwing methods:</p>
          <div className="flex flex-col">
            <UseObs stream={stream} setShowTutorial={setShowTutorial} setShowWebcam={setShowWebcam} />
            <Button onClick={() => setShowWebcam(true)}>
              Use webcam (beta)
            </Button>
          </div>
        </>
      )}
    </>
  );
};
