import type { NextPage } from "next";
import React, { useState } from "react";
import DeployLNFT from "components/DeployForm";
import CreateLNFT from "components/CreateForm";
import { CreateContextProvider } from "context/createContext";
import { LiveNFT } from "context/createContext";
import SuccessModal from "components/SuccessModal";
import Container from "components/container";
import Menu from "components/Menu";
const Create: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [liveNFT, setLiveNFT] = React.useState<LiveNFT>({
    name: "",
    description: "",
  });

  const onExit = () => {
    setIsOpen(false);
    // redirect to index
    window.location.href = "/";
  };

  return (
    <CreateContextProvider liveNFT={liveNFT} setLiveNFT={setLiveNFT}>
      {isOpen && SuccessModal(() => onExit())}
      <Container>
        <Menu />
        {liveNFT.baseUri ? <DeployLNFT /> : <CreateLNFT />}
      </Container>
    </CreateContextProvider>
  );
};

export default Create;
