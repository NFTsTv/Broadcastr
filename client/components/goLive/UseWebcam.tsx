import React from "react";
import Modal from "components/Modal";
import Link from "next/link";

const UseWebcam = ({ address }: { address: string }) => {
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
            <h1 className="mb-2">Warning!</h1>
            <p>
              You can use your webcam to stream directly into the Live NFT, but
              this feature is still in development and might not work at all.
              For the best experience posible, we recomend using chrome.
            </p>
            <Link href={`/stream?address=${address}`}>
              <button className="btn btn-sm mt-4 text-white">
                Take me to the webcam
              </button>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="btn btn-sm mt-4 text-white"
            >
              Dont do it
            </button>
          </div>
        </Modal>
      )}
      <div
        onClick={() => {
          setIsOpen(true);
        }}
        className="btn"
      >
        Use webcam
      </div>
    </>
  );
};

export default UseWebcam;