import { useState } from "react";
import { Stream } from "@livepeer/react";
import Button from "components/Buttons/Button";
import SendTestSignal from "./UseTestSignal";
import useAlertContext from "hooks/useAlertContext";
import { AlertType } from "context/alertContext";

const UseObs = ({
  stream,
  setShowTutorial,
  setShowWebcam,
}: {
  stream: Stream;
  setShowTutorial: (value: boolean) => void;
  setShowWebcam: (value: boolean) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const context = useAlertContext();
  const { setAlert } = context;

  return (
    <>
      {isOpen && (
        <div className="flex flex-col m-auto space-y-4 absolute bg-base-100 p-5 h-full top-0 w-full left-0 z-20">
          <h1 className="mb-2">Streaming details</h1>
          <p>
            You need to use a livestreaming software to go live on your Castr.
            We recomend <a href="https://obsproject.com/">OBS</a> or{" "}
            <a href="https://streamyard.com/">Streamyard</a>.
            <br />
            <br />
            <Button
              onClick={() => setShowTutorial(true)}
              styles="btn-xs btn-accent"
            >
              Watch
            </Button>
            {` `}
            the following video to see how to use OBS to go live on your Castr.
          </p>
          <br />
          <p>
            <SendTestSignal stream={stream} /> a test 10 minute livestream to
            see how you castr looks like when you go live.
          </p>

          <p>
            Once you are ready to go live, use the following details to stream:
          </p>
          <div className="form-control space-y-2">
            <>
              <label className="label">
                <span className="label-text">Ingest url</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value="rtmp://rtmp.livepeer.com/live"
                onClick={(e) => {
                  navigator.clipboard.writeText(
                    "rtmp://rtmp.livepeer.com/live"
                  );
                }}
              />
            </>
            <>
              <label className="label">
                <span className="label-text">Streamkey</span>
              </label>
              <input
                type="password"
                placeholder="Type here"
                className="input input-bordered w-full cursor-pointer"
                value={stream?.streamKey}
                onClick={(e) => {
                  navigator.clipboard.writeText(stream?.streamKey).then(() => {
                    setAlert({
                      type: AlertType.info,
                      content: "Copied to clipboard",
                    });
                  });
                }}
              />
            </>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </div>
        </div>
      )}
      <div
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <button
          onClick={() => setShowWebcam(false)}
          className="btn btn-primary w-full mb-4"
        >
          Use software
        </button>
      </div>
    </>
  );
};

export default UseObs;
