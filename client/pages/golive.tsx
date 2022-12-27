import type { NextPage } from "next";
import React from "react";
import Container from "components/container";
import Menu from "components/Menu";
import { useRouter } from "next/router";
import { useLivenft } from "hooks/useLiveNFT";
import Modal from "components/Modal";
import OBS from "components/goLive/OBS";
import Webcam from "components/goLive/Webcam";

const Create: NextPage = () => {
  const router = useRouter();
  const { address } = router.query;
  const { stream } = useLivenft(address as string);
  const [isOpen, setIsOpen] = React.useState(false);
  const [showWebcam, setShowWebcam] = React.useState(false);
  const [showObs, setShowObs] = React.useState(false);

  const renderContent = () => {
    if (showWebcam) {
      return <Webcam address={address as string} />;
    }
    if (showObs && stream) {
      return <OBS streamKey={stream.streamKey} />;
    }
  };

  const RenderModal = () => (
    <Modal onExit={() => {}}>
      <div className="flex flex-col m-auto">
        {renderContent()}
        <button
          onClick={() => setIsOpen(false)}
          className="btn btn-sm btn-warning mt-4 text-white"
        >
          Dont do it
        </button>
      </div>
    </Modal>
  );

  return (
    <Container>
      <Menu />
      {showObs || showWebcam ? (
        renderContent()
      ) : (
        <>
          <h1>Go live on your LNFT!</h1>

          <p>
            You can use obs, or any other livestreaming software to go live.
            Check out the livepeer documentation on how to use OBS to start
            livestreaming
          </p>

          <div
            onClick={() => {
              setShowObs(true);
            }}
            className="btn"
          >
            Use OBS
          </div>
          <div
            onClick={() => {
              setIsOpen(true);
            }}
            className="btn"
          >
            Use webcam
          </div>
        </>
      )}
    </Container>
  );
};

export default Create;
