import type { NextPage } from "next";
import Link from "next/link";
import React, { useState } from "react";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { parseEther } from "ethers/lib/utils";
import contractInterface from "../contract-abi.json";

const contractConfig = {
  addressOrName: "0x7278AE17fdb96f8033F8625f201107Ed0C173c24",
  contractInterface: contractInterface,
};

const CreateForm: NextPage = () => {
  const { isConnected, address } = useAccount();

  // TODO: Handle setting the LNFT price
  // const { price, setPrice } = useState("0");

  // // handle amount
  // const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     // handle error when leaving an empty input or entering a non-nuamber value or lower than 0.05
  //     if (
  //         e.target.value === "" || isNaN(Number(e.target.value))
  //     ) {
  //         setPrice("0");
  //         return;
  //     } else {
  //         setPrice(e.target.value);
  //     }
  // };

  const { config, error } = usePrepareContractWrite({
    ...contractConfig,
    functionName: "createLiveNFT",
  });

  const { write } = useContractWrite(config);

  return (
    <>
      <h1 className="text-4xl font-bold">Create your LNFT</h1>
      {isConnected && address}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Price of your LNFT</span>
        </label>
        <label className="input-group">
          <span>Price</span>
          <input
            type="text"
            placeholder="0.08"
            className="input input-bordered"
          />
          <span>ETH</span>
        </label>
        <button onClick={() => write?.()} className="btn btn-primary">
          Create LNFT
        </button>
        {error && (
          <div>
            An error occurred preparing the transaction: {error.message}
          </div>
        )}
      </div>
    </>
  );
};

export default CreateForm;
