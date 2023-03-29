import { GoLive } from "./GoliveButtons";
import StreamDetails from "./StreamDetails";
import useAddressContext from "hooks/useAddressContext";
import useCastr from "hooks/useCastr";
import LoadingSkeleton from "components/Elements/LoadingSkeleton";
const ControlSideBar = ({
  setShowTutorial,
  setShowWebcam,
}: {
  setShowTutorial: (value: boolean) => void;
  setShowWebcam: (value: boolean) => void;
}) => {
  const { address } = useAddressContext();
  const { stream, CastrData } = useCastr(address);

  return (
    <div className="flex flex-col p-5 space-y-5 h-full lg:h-full lg:W-2/5 xl:w-1/5 relative overflow-auto  xl:min-w-[400px]">
      {!(stream && CastrData) ? (
        <>
          <LoadingSkeleton />
          <LoadingSkeleton />
        </>
      ) : (
        <>
          <GoLive
            address={address}
            stream={stream}
            CastrData={CastrData}
            setShowTutorial={setShowTutorial}
            setShowWebcam={setShowWebcam}
          />
          <StreamDetails address={address} details={CastrData} />
        </>
      )}
    </div>
  );
};

export default ControlSideBar;
