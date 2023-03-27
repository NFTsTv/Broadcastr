import useCastr from "hooks/useCastr";
import Button from "components/Buttons/Button";
import NFTEmbed from "components/Elements/NFTEmbed";
import { PlayerURL } from "utils/constants";
import OfflineView from "components/Watch/OfflineView";

import { formatEther, formatUnits } from "ethers/lib/utils";

const CastrExploreCard = ({ address }: { address: string }) => {
  const { stream, CastrData } = useCastr(address);
  return (
    <a
      href={"/watch?address="+address}
      key={CastrData?.baseUri}
      className="w-full sm:w-1/2 lg:w-1/3 box-border p-2 no-underline cursor-pointer"
    >
      <div className="border-2 hover:border-primary border-base-100 rounded-xl">
        <figure className="bg-black text-gray-500 h-[200px] flex justify-center items-center rounded-t-xl">
          {!stream?.isActive ? (
            <div className="">Stream is Offline</div>
          ) : (
            <div></div>
          )}
        </figure>
        <div className=" items-center text-center p-2">
          <div className="text-xl text-left text-white">{CastrData?.name}</div>
          <div className="flex flex-row items-center space-x-1 mt-2">
            <div className="badge ">
              {CastrData?.currentSubs.toString()} /{" "}
              {CastrData?.totalSupply == 0
                ? "∞"
                : CastrData?.totalSupply.toString()}
            </div>
            <div className="badge">
              {formatEther(CastrData?.price ?? 0)} MATIC
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default CastrExploreCard;
