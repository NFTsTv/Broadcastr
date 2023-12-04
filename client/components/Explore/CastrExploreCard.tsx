import useCastr from "hooks/useCastr";
import { formatEther } from "ethers/lib/utils";
import HLSFirstFrame from "./HLSFirstFrame";
import OfflineView from "components/Watch/OfflineView";
import { useEffect } from "react";
import LoadingSkeleton from "components/Elements/LoadingSkeleton";
const CastrExploreCard = ({
  address,
  updateLiveAddress,
}: {
  address: string;
  updateLiveAddress: (address: string) => void;
}) => {
  const { stream, CastrData, isLoading } = useCastr(address);

  useEffect(() => {
    if (stream?.isActive) {
      updateLiveAddress(address);
    }
  }, [stream?.isActive]);

  return (
    <a
      href={"/watch?address=" + address}
      key={CastrData?.baseUri}
      className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 box-border p-1 no-underline cursor-pointer"
    >
      <div className="border-2 hover:border-primary border-base-300 rounded-xl">
        <div className="p-2">
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <>
              <figure className="bg-black text-gray-500 flex justify-center items-center">
                {!stream?.isActive ? (
                  <OfflineView />
                ) : (
                  <HLSFirstFrame url={stream?.playbackId} />
                )}
              </figure>
              <div className=" items-center text-center p-2">
                <div className="text-xl text-left text-white">
                  {CastrData?.name}
                </div>
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
            </>
          )}
        </div>
      </div>
    </a>
  );
};

export default CastrExploreCard;
