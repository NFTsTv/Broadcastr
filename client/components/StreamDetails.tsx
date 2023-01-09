import { LiveNFT } from "types/general";
import { formatEther } from "ethers/lib/utils";
import ShareButton from "components/Share/Button";


const DetailBox = ({
  title,
  text,
  children,
}: {
  title: string;
  text: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col mx-auto space-y-2">
      <div className="stat-title">{title}</div>
      <div className="stat-value">{text}</div>
      {children}
    </div>
  );
};

const StreamDetails = ({
  details,
  address,
}: {
  details: LiveNFT;
  address: string;
}) => {
  return (
    <div className="flex flex-col m-auto w-full rounded-xl mt-4">
      <div className="flex flex-col space-y-4 text-center">
        <div className="flex flex-row w-full max-w-full text-white justify-center">
          <DetailBox
            title="Subscription price"
            text={formatEther(details.price) + " eth"}
          />
          {/* <DetailBox title="Earned" text={String(details.totalSupply) + "   $"}> */}
          <DetailBox title="Earned" text={"0  $"}>
            <button className="btn btn-sm btn-disabled	">Withdrawal</button>
          </DetailBox>
        </div>
      </div>
      <div className="flex flex-row mt-8">
        <a
          target="_blank"
          rel="noreferrer"
          className="btn btn-sm btn-outline btn-info text-white m-auto"
          href={`https://testnets.opensea.io/assets/goerli/${address}/1`}
        >
          View on Opensea
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          className="btn btn-sm btn-outline btn-info text-white m-auto"
          href={`/view?address=${address}`}
        >
          Subscribers page
        </a>
        <ShareButton />
      </div>
    </div>
  );
};

export default StreamDetails;
