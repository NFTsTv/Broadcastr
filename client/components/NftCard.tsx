import React from "react";
import Link from "next/link";
import { useLivenft } from "hooks/useLiveNFT";
interface Props {
  address: string;
}

const NftCard = ({ ...props }: Props) => {
  const contractAddress = process.env.NEXT_PUBLIC_FACTORY_CONTRACT_ADDRESS;
  if (!contractAddress || !props.address) return null;
  const { lnftData } = useLivenft(props.address);
  return (
    <div className="card-body h-full" key={props.address}>
      <p className="ml-auto">{props.address.slice(0, 10)}</p>
      <h2 className="card-title">{lnftData?.name}</h2>
      <p>{lnftData?.description}</p>
      <div className="card-actions justify-end mt-auto">
        <Link href={`/golive?address=${props.address}`}>
          <button className="btn btn-sm btn-primary text-white">
            Go Live
          </button>
        </Link>
        <Link
          href={`https://testnets.opensea.io/assets/goerli/${props.address}/1`}
        >
          <button className="btn btn-sm btn-secondary text-white">
            Preview
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NftCard;
