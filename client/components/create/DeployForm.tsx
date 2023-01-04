import React from "react";
import useCreateLiveNFT from "hooks/useCreateLiveNFT";
import Button from "components/Buttons/Button";
import { CreateContext } from "context/createContext";
const DeployLNFT = () => {
  const context = React.useContext(CreateContext);
  if (!context) {
    throw "context requred to use this hook";
  }
  const { liveNFT, handleSetData, formError } = context;

  const { deployContract, error, isLoading } = useCreateLiveNFT();

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
            value={liveNFT.price}
            className="input input-bordered w-3/4"
            onChange={(e) => handleSetData("price", e.target.value)}
          />
          <span className="w-1/4">ETH</span>
        </label>
        <label className="label">
          <span className="label-text">Total supply</span>
        </label>
        <input
          type="text"
          placeholder="100"
          className="input input-bordered w-full mb-4"
          value={liveNFT.totalSupply}
          onChange={(e) => handleSetData("totalSupply", e.target.value)}
        />
        <Button onClick={deployContract} isLoading={isLoading}>
          Deploy
        </Button>
        {formError && <div>An error occurred: {formError}</div>}
        {error && <div>{error}</div>}
      </div>
    </>
  );
};

export default DeployLNFT;
