import { GoLive } from "./GoliveButtons";
import StreamDetails from "./StreamDetails";
import useAddressContext from "hooks/useAddressContext";
import useCastr from "hooks/useCastr";
import LoadingSkeleton from "components/Elements/LoadingSkeleton";
const ControlSideBar = () => {
  const { address } = useAddressContext();
  const { stream, CastrData } = useCastr(address);

  return (
    <div className="flex flex-col p-5 space-y-5 h-2/3 lg:h-full lg:W-2/5 xl:w-1/5 relative overflow-auto bg-base-200 min-w-[400px]">
      {!(stream && CastrData) ? (
        <>
          <LoadingSkeleton />
          <LoadingSkeleton />
        </>
      ) : (
        <>
          <GoLive address={address} stream={stream} CastrData={CastrData} />
          <StreamDetails address={address} details={CastrData} />
        </>
      )}
    </div>
  );
};

export default ControlSideBar;
