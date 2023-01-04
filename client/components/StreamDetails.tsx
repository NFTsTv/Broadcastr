import { LiveNFT } from "types/general";
const StreamDetails = ({ details }: { details: LiveNFT }) => {
  return (
    <div className="flex flex-col m-auto border w-full rounded-xl p-5 mt-4">
      <div className="flex">
        <label className="label">
          name:
          <span className="font-bold mx-2">{details.name}</span>
        </label>
      </div>
      <div className="flex">
        <label className="label">
          description:
          <span className="font-bold mx-2">{details.description}</span>
        </label>
      </div>
      <div className="flex flex-row">
        <div className="flex flex-col m-auto">
          <label className="label mx-auto">Total supply</label>
          <span className="font-bold mx-2">{String(details.totalSupply)}</span>
        </div>
        <div className="flex flex-col m-auto">
          <label className="label mx-auto">Price</label>
          <span className="font-bold mx-2">{String(details.price)}</span>
        </div>
      </div>
    </div>
  );
};

export default StreamDetails;
