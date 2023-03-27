import useCastr from "hooks/useCastr";
import Button from "components/Buttons/Button";
import NFTEmbed from "components/Elements/NFTEmbed";
import { PlayerURL } from "utils/constants";
import OfflineView from "components/Watch/OfflineView";
const CastrExploreCard = ({ address }: { address: string }) => {
  const { stream, CastrData } = useCastr(address);

  return (
    <div key={CastrData?.baseUri} className="card w-96 ">
      <figure className="p-3">
        <iframe
          src={PlayerURL + stream?.id + "&chat=false"}
          className="w-full h-full"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{CastrData?.name}</h2>
        <p>{CastrData?.description}</p>
        {/* <div className="card-actions">
          <button className="btn btn-primary">Buy Now</button>
        </div> */}
      </div>
    </div>
  );
};

export default CastrExploreCard;
