import type { NextPage } from "next";
import Link from "next/link";
import React, { useState } from "react";

import {
    useAccount,
    useContractRead,
    useContractWrite,
    usePrepareContractWrite
} from "wagmi";
import { parseEther } from "ethers/lib/utils";
import contractInterface from "../contract-abi.json";

const contractConfig = {
    addressOrName: "address",
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

    const { config: contractWriteConfig } = usePrepareContractWrite({
        ...contractConfig,
        functionName: "mint",
        // args: [{ value: parseEther(price) }],
    });

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
                    <input type="text" placeholder="0.08" className="input input-bordered" />
                    <span>ETH</span>
                </label>
            </div>
        </>
    );
};

export default CreateForm;