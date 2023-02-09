import { useEffect, useState } from "react";
import useCreateContext from "hooks/useCreateContext";
import DeployLNFT from "components/Create/DeployForm";
import CreateLNFT from "components/Create/CreateForm";
import Intro from "components/Create/Intro";
import Container from "components/Elements/Container";
import GoBackButton from "components/Buttons/GoBackButton";

const CreateComponent = () => {
  const [step, setStep] = useState(0);
  const { Castr } = useCreateContext();

  useEffect(() => {
    if (Castr?.baseUri) {
      setStep(2);
    }
  }, [Castr]);

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

export default CreateComponent;