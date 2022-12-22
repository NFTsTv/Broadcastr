import React from "react";
import useCreateLiveNFT from "hooks/useCreateLiveNFT";



const DeployLNFT = () => {
  const { handleSetData, deployContract, error, isLoading } = useCreateLiveNFT();


  return (
    <>
      <span className="text-4xl bold mb-4">Deploy your Live NFT!</span>
      <div className="form-control w-full max-w-xs m-auto">
        <label className="label">
          <span className="label-text">Price of your LNFT</span>
        </label>
        <label className="input-group mb-4 max-w-xs w-full">
          <input
            type="text"
            placeholder="0.08"  
            className="input input-bordered"
            onChange={(e) => handleSetData("price", e.target.value)}
          />
          <span>ETH</span>
        </label>
        <button onClick={deployContract} className="btn btn-primary">
          {isLoading ? "Loading..." : "Deploy"}
        </button>
        {error && (
          <div>
            An error occurred: {error}
          </div>
        )}
      </div>
    </>
  );
};

export default DeployLNFT;
