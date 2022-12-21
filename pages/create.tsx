import type { NextPage } from "next";
import React, { useState } from "react";
import Container from "components/container";
import DeployLNFT from "components/DeployForm";
import CreateLNFT from "components/CreateForm";
import { CreateContextProvider } from "context/createContext";
import { LiveNFT } from "context/createContext";
import SuccessModal from "components/SuccessModal";

const Create: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [liveNFT, setLiveNFT] = React.useState<LiveNFT>({
    name: "",
    description: "",
    price: "",
  });

  const onExit = () => {
    setIsOpen(false);
    // redirect to index
    window.location.href = "/";
  };

  return (
    <CreateContextProvider liveNFT={liveNFT} setLiveNFT={setLiveNFT}>
      <Container>
        {isOpen && SuccessModal(() => onExit())}
        {liveNFT.baseUri ? <DeployLNFT /> : <CreateLNFT />}
      </Container>
    </CreateContextProvider>
  );
};

export default Create;
