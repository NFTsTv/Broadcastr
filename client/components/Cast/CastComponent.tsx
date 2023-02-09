import { ViewContext } from "context/viewContext";
import { useContext } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { GoLive } from "components/Cast/GoliveButtons";
import StreamDetails from "components/StreamDetails";
import ViewOnOpensea from "components/Buttons/ViewOnOpensea";
import ShareButton from "components/Share/Button";
import ViewComponent from "components/Watch";
import { Routes } from "utils/constants";

const CastComponent = () => {
  const context = useContext(ViewContext);

  if (!context) {
    return <div>loading</div>;
  }
  const { address, stream, CastrData } = context;

  if (!stream || !CastrData) {
    return <div>loading</div>;
  }

  return (
    <div className="flex h-full lg:flex-row flex-col-reverse">
      <div className="flex flex-col p-5 space-y-5 h-2/3 lg:h-full lg:w-1/5 relative overflow-auto">
        <ConnectButton
          accountStatus={{
            smallScreen: "avatar",
            largeScreen: "full",
          }}
          showBalance={false}
        />
        <GoLive
          address={address}
          stream={stream}
          CastrData={CastrData}
        />
        <StreamDetails address={address} details={CastrData} />
      </div>
      <div className="flex flex-col h-2/4 lg:w-4/5 lg:h-full border-1 lg:relative">
        <div className="absolute bottom-0 lg:top-0 lg:left-0 z-10 p-4 w-full flex justify-center lg:justify-start h-9">
          <ViewOnOpensea address={address} />
          <ShareButton />
          <a
            target="_blank"
            rel="noreferrer"
            href={`${Routes.WATCH}?address=${address}`}
          >
            <div className="btn btn-sm btn-secondary text-white m-1">
              Mint page
            </div>
          </a>
        </div>
        <ViewComponent />
      </div>
    </div>
  );
};

export default CastComponent;
