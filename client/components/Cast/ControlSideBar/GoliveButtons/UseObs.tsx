import { useState } from "react";
import { Stream } from "@livepeer/react";
import Button from "components/Buttons/Button";
import useModalContext from "hooks/useModalContext";
const UseObs = ({
  stream,
  setShowTutorial,
}: {
  stream: Stream;
  setShowTutorial: (value: boolean) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { setModalContent, setIsOpen: setModalIsOpen } = useModalContext();

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
            <Button onClick={() => setShowTutorial(true)} styles="btn-xs btn-accent">
              Watch
            </Button>
            {` `}
            the following video to see how to use OBS to go live on your Castr.
          </p>
          <h2>Stream details</h2>
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
                  console.log(stream);
                }}
              />
            </>
            <>
              <label className="label">
                <span className="label-text">Streamkey</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={stream?.streamKey}
                onClick={(e) => {
                  console.log(stream);
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
        <button className="btn btn-primary w-full mb-4">Use Stream key</button>
      </div>
    </>
  );
};

export default UseObs;
