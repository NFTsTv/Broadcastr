import type { NextPage } from "next";
import React from "react";
import { CreateContextProvider } from "context/createContext";
import useCreateContext from "hooks/useCreateContext";
import DeployLNFT from "components/create/DeployForm";
import CreateLNFT from "components/create/CreateForm";
import Intro from "components/create/Intro";
import Container from "components/container";
import GoBackButton from "components/Buttons/GoBackButton";


const CreateComponent = () => {
  const [step, setStep] = React.useState(0);
  const { liveNFT } = useCreateContext();

  React.useEffect(() => {
    if (liveNFT?.baseUri) {
      setStep(2);
    }
  }, [liveNFT]);

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <Intro
            onClick={() => {
              setStep(1);
            }}
          />
        );
      case 1:
        return <CreateLNFT />;
      case 2:
        return <DeployLNFT />;
      default:
        <>Loading</>;
    }
  };

  return (
    <Container>
      <div className="flex flex-row">
        <h2 className="mr-auto">{step + 1}/3</h2>
        {step !== 0 && (
          <GoBackButton
            onClick={() => {
              setStep(step - 1);
            }}
          />
        )}
      </div>
      {renderStep()}
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
