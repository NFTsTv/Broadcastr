import Modal from "components/Modal";
import React from "react";
import { Stream } from "@livepeer/react";
import Button from "components/Buttons/Button";
const UseObs = ({ stream }: { stream: Stream }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const sendTestSignal = () => {
    // post request to teststream.live
    fetch("/api/sendTestStream", {
      method: "POST",
      body: JSON.stringify({
        streamKey: stream.streamKey,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsOpen(false);
      })
      .catch((error) => {
      });
  };

  return (
    <>
      {isOpen && (
        <Modal
          onExit={() => {
            setIsOpen(false);
          }}
        >
          <div className="flex flex-col space-y-4 m-auto">
            <h1 className="mb-2">Test stream</h1>
            <p>
              Send a ten minute test signal to the Live NFT with {" "}
              <a href="https://teststream.live/">teststream.live</a>
            </p>
            <Button onClick={() => sendTestSignal()}>Send!</Button>
          </div>
        </Modal>
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