import React from "react";
import Modal from "components/Elements/Modal";
import Link from "next/link";
import { Routes } from "utils/constants";
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
            <Link href={Routes.WATCH + `?address=${address}`}>
              <button className="btn mt-4 text-white">
                Take me to the webcam
              </button>
            </Link>
          </div>
        </Modal>
      )}
      <div
        onClick={() => {
          setIsOpen(true);
        }}
        className="btn mb-4"
      >
        Use webcam
      </div>
    </>
  );
};

export default UseWebcam;
