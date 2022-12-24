import type { NextPage } from "next";
import React from "react";
import DeployLNFT from "components/DeployForm";
import CreateLNFT from "components/CreateForm";
import { CreateContextProvider, CreateContext } from "context/createContext";
import Container from "components/container";
import Menu from "components/Menu";

const CreateComponent = () => {
  const context = React.useContext(CreateContext);
  if(!context) return <>missing context</>
  const { liveNFT } = context;
  return (
    <Container>
      <Menu />
      {liveNFT?.baseUri ? <DeployLNFT /> : <CreateLNFT />}
    </Container>
  );
};

const Create: NextPage = () => {
  return (
    <CreateContextProvider>
      <CreateComponent />
    </CreateContextProvider>
  );
};

export default Create;
