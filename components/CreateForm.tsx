import React from "react";
import useCreateLiveNFT from "hooks/useCreateLiveNFT";

const CreateLNFT = () => {
  const { handleSetData, handleCreateStream, error } = useCreateLiveNFT();

  return (
    <div className="flex flex-col">
      <span className="text-4xl bold mb-4">Create your Live NFT!</span>
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
        <button onClick={handleCreateStream} className="btn btn-primary">
          Next step
        </button>
        {error && <span className="text-red-500">{error}</span>}
      </div>
    </div>
  );
};

export default CreateLNFT;
