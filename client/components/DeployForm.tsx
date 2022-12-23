import React from "react";
import useCreateLiveNFT from "hooks/useCreateLiveNFT";
import Button from "components/Button";

const DeployLNFT = () => {
  const { handleSetData, deployContract, error, isLoading } =
    useCreateLiveNFT();

  return (
    <>
      <h1>Deploy your Live NFT</h1>
      <div className="form-control w-full max-w-xs m-auto">
        <label className="label">
          <span className="label-text">Price of your LNFT</span>
        </label>
        <label className="input-group mb-4 max-w-xs w-full">
          <input
            type="text"
            placeholder="0.08"
            className="input input-bordered w-3/4"
            value="0"
            // onChange={(e) => handleSetData("price", e.target.value)}
          />
          <span className="w-1/4">ETH</span>
        </label>
        <label className="label">
          <span className="label-text">Price of your LNFT</span>
        </label>
        <input
          type="text"
          placeholder="0.08"
          className="input input-bordered w-full mb-4"
          value="0"
          // onChange={(e) => handleSetData("price", e.target.value)}
        />
        <Button onClick={deployContract} isLoading={isLoading}>
          Deploy
        </Button>
        {error && <div>An error occurred: {error}</div>}
      </div>
    </>
  );
};

export default DeployLNFT;
