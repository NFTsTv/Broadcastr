import { usePrepareContractWrite, useContractWrite, useAccount, Address } from "wagmi";
import CastrABI from "contracts/Castr-abi";
import Button from "./Button";

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
    <Button styles="btn-info" onClick={() => write?.()}>
      Withdrawal
    </Button>
  );
};

export default WithdrawalButton;
