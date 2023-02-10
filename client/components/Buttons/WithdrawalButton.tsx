import { usePrepareContractWrite, useContractWrite, useAccount, Address } from "wagmi";
import CastrABI from "contracts/Castr-abi";

const WithdrawalButton = ({ address }: { address: string }) => {
  const { address: userAddress } = useAccount();
  const { config, error } = usePrepareContractWrite({
    address: address as Address,
    abi: [...CastrABI],
    functionName: "withdrawPayments",
    args: [userAddress],
  });
  const { write } = useContractWrite(config);
  return (
    <button className="btn btn-sm" onClick={() => write?.()}>
      Withdrawal
    </button>
  );
};

export default WithdrawalButton;
