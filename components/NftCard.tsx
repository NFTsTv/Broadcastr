import React from "react";
import { useContractRead } from "wagmi";
import { LiveNFT } from "context/createContext";
import LNFTcontractABI from "contracts/factory-abi";
import Link from "next/link";
import { getRandomTailwindColor } from "utils/helpers";
interface Props {
  address: string;
}

const parseParams = (params: Array<string>): LiveNFT => {
  return {
    baseUri: params[0],
    name: params[1],
    description: params[2],
  };
};
const NftCard = ({ ...props }: Props) => {
  const contractAddress = process.env.NEXT_PUBLIC_FACTORY_CONTRACT_ADDRESS;
  if (!contractAddress || !props.address) return null;
  const [lnftData, setLnftData] = React.useState<LiveNFT | null>(null);
  const { data } = useContractRead({
    addressOrName: contractAddress,
    contractInterface: LNFTcontractABI,
    functionName: "getMetadata",
    args: [props.address],
  });

  React.useEffect(() => {
    if (data) {
      setLnftData(parseParams(data as Array<string>));
    }
  }, [data]);

  return (
    <div className={`card w-full bg-${getRandomTailwindColor()} text-primary-content box-border`}>
      <div className="card-body">
      <p className="ml-auto">{props.address.slice(0, 10 )}</p>
        <h2 className="card-title">{lnftData?.name}</h2>
        <p>{lnftData?.description}</p>
        <div className="card-actions justify-end mt-5">
          <Link href={`/stream?address=${props.address}`}>
            <button className="btn btn-sm border-red-700 bg-red-700 text-white">Go Live</button>
          </Link>
          <Link href={`https://testnets.opensea.io/assets/goerli/${props.address}/1`}>
            <button className="btn btn-sm border-pink-700 bg-pink-700 text-white">Preview</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NftCard;
