import { useState } from "react";
import Modal from "components/Elements/Modal";
import { Stream } from "@livepeer/react";
import Button from "components/Buttons/Button";

const UseObs = ({ stream }: { stream: Stream }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const sendTestSignal = () => {
    setIsLoading(true);
    fetch("/api/sendTestStream", {
      method: "POST",
      body: JSON.stringify({
        streamKey: stream.streamKey,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsOpen(false);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsOpen(false);
        setIsLoading(false);
      });
  };

  return (
    <>
      {isOpen && (
        <div className="flex flex-col m-auto space-y-4 absolute bg-base-100 p-5 h-full top-0 w-full left-0 z-20">
          <h1 className="mb-2">Test stream</h1>
          <p>
            Send a ten minute test signal to the Live NFT with{" "}
            <a href="https://teststream.live/">teststream.live</a>
          </p>
          <Button onClick={() => {
            sendTestSignal();
            setIsOpen(false);
          }} isLoading={isLoading}>
            Send!
          </Button>
        </div>
      )}
      <div
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <button className="btn mb-4 w-full">Send test stream</button>
      </div>
    </>
  );
};

export default UseObs;
