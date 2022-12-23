import React from "react";
import useCreateLiveNFT from "hooks/useCreateLiveNFT";
import Button from "components/Button";
import Container from "components/container";

const CreateLNFT = () => {
  const { handleSetData, handleCreateStream, error, isLoading } =
    useCreateLiveNFT();

  return (
    <Container>
        <h1>Create your Live NFT</h1  >
      <div className="form-control">
        <label className="label">
          <span className="label-text">Whats the channel name?</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full mb-4"
          onChange={(e) => handleSetData("name", e.target.value)}
        />
        <label className="label">
          <span className="label-text">Whats the channel description?</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full mb-8"
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
