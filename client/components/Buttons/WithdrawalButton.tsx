import {
    usePrepareContractWrite,
    useContractWrite,
    useAccount
} from 'wagmi';
import LNFTcontractABI from "contracts/LNFTcontract-abi";

const WithdrawalButton = ({
    address,
}: {
    address: string;
}) => {
    const { address: userAddress } = useAccount();
    const { config, error } = usePrepareContractWrite({
        addressOrName: address,
        contractInterface: [...LNFTcontractABI],
        functionName: "withdrawPayments",
        args: [userAddress],
    })
    const { write } = useContractWrite(config)
    return <button className="btn btn-sm" onClick={() => write?.()} >Withdrawal</button>
}

export default WithdrawalButton;