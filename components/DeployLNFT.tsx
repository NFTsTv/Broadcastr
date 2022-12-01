import React from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import contractInterface from "../contract-abi.json";

const contractConfig = {
  addressOrName: "0x7278AE17fdb96f8033F8625f201107Ed0C173c24",
  contractInterface: contractInterface,
};

interface Props {
  onSuccessfulCreation: () => void;
}

const DeployLNFT = ({ ...props }: Props) => {
  //const [price, setPrice] = React.useState<number | undefined>();
  // const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   // handle error when leaving an empty input or entering a non-nuamber value or lower than 0.05
  //   if (e.target.value === "" || isNaN(Number(e.target.value))) {
  //     setPrice("0");
  //     return;
  //   } else {
  //     setPrice(e.target.value);
  //   }
  // };

  const { config, error } = usePrepareContractWrite({
    ...contractConfig,
    functionName: "createLiveNFT",
  });

  const { data, write, isLoading, isSuccess } = useContractWrite(config);

  const { status, error: txError } = useWaitForTransaction({
    hash: data?.hash,
  });

  React.useEffect(() => {
    console.log(status)
    if (status === "success") {
      props.onSuccessfulCreation();
    }
  }, [status]);

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
          />
          <span>ETH</span>
        </label>
        <button onClick={() => write?.()} className="btn btn-primary">
          {isLoading || status === "loading" ? "Loading..." : "Deploy"}
        </button>
        {error && (
          <div>
            An error occurred preparing the transaction: {error.message}
          </div>
        )}
        {txError && (
          <div>
            An error occurred while waiting for the transaction:{" "}
            {txError.message}
          </div>
        )}
      </div>
    </>
  );
};

export default DeployLNFT;
