import Link from "next/link";
import useLiveNFT from "hooks/useCastr";
import { NFTMarketAddress } from "utils/constants";

interface Props {
  address: string;
}

const NftCard = ({ ...props }: Props) => {
  if (!!props.address) return null;
  const { CastrData } = useLiveNFT(props.address);
  return (
    <div className="card-body h-full" key={props.address}>
      <p className="ml-auto">{props.address.slice(0, 10)}</p>
      <h2 className="card-title">{CastrData?.name}</h2>
      <p>{CastrData?.description}</p>
      <div className="card-actions justify-end mt-auto">
        <Link href={`/golive?address=${props.address}`}>
          <button className="btn btn-sm btn-primary text-white">Go Live</button>
        </Link>
        <Link
          href={`${NFTMarketAddress}/${props.address}/1`}
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
