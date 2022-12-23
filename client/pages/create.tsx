import type { NextPage } from "next";
import React, { useState } from "react";
import DeployLNFT from "components/DeployForm";
import CreateLNFT from "components/CreateForm";
import { CreateContextProvider } from "context/createContext";
import { LiveNFT } from "context/createContext";
import Container from "components/container";
import Menu from "components/Menu";


const Create: NextPage = () => {
  const [liveNFT, setLiveNFT] = React.useState<LiveNFT>({
    name: "",
    description: "",
  });

  return (
    <CreateContextProvider liveNFT={liveNFT} setLiveNFT={setLiveNFT}>
      <Container>
        <Menu />
        {liveNFT.baseUri ? <DeployLNFT /> : <CreateLNFT />}
      </Container>
    </CreateContextProvider>
  );
};

export default Create;
