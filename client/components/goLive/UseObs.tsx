import Modal from "components/Modal";
import React from "react";
import { Stream } from "@livepeer/react";

const UseObs = ({ stream }: { stream: Stream }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      {isOpen && (
        <Modal
          onExit={() => {
            setIsOpen(false);
          }}
        >
          <div className="flex flex-col m-auto">
            <p>
              You can use obs, or any other livestreaming software to go live.
              Check out the{" "}
              <a href="https://docs.livepeer.org/guides/developing/stream-via-obs">
                livepeer documentation
              </a>{" "}
              on how to use OBS to start livestreaming
            </p>
            <h2>Stream details</h2>
            <div className="form-control">
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
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="btn btn-sm mt-4 text-white"
            >
              Done!
            </button>
          </div>
        </Modal>
      )}
      <div
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <button className="btn btn-primary w-full">Use Stream key</button>
      </div>
    </>
  );
};

export default UseObs;
