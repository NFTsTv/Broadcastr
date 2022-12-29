import React from "react";
import useCreateLiveNFT from "hooks/useCreateLiveNFT";
import Button from "components/Buttons/Button";
import Container from "components/container";
import { CreateContext } from "context/createContext";

const CreateLNFT = () => {
  const context = React.useContext(CreateContext);
  if (!context) {
    throw "context requred to use this hook";
  }
  const { liveNFT, handleSetData } = context;
  const { handleCreateStream, error, isLoading } = useCreateLiveNFT();

  return (
    <Container>
      <h1>Create your Live NFT</h1>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Whats the channel name?</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full mb-4"
          value={liveNFT.name}
          onChange={(e) => handleSetData("name", e.target.value)}
        />
        <label className="label">
          <span className="label-text">Whats the channel description?</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full mb-8"
          value={liveNFT.description}
          onChange={(e) => handleSetData("description", e.target.value)}
        />
        <Button onClick={handleCreateStream} isLoading={isLoading}>
          Create LNFT
        </Button>

        {error && <span className="text-red-500">{error}</span>}
      </div>
    </Container>
  );
};

export default CreateLNFT;
