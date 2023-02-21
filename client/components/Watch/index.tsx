import { useContext } from "react";
import { ViewContext } from "context/viewContext";
import { PlayerURL } from "utils/constants";
import NetworkDropdown from "components/Elements/NetworkDropdown";
import {
  ViewOnOpensea,
  ViewOnRarible,
} from "components/Buttons/ViewOnPlatform";
import MintButton from "components/Buttons/MintButton";
import ShareButton from "components/Share/Button";

const WatchComponent = () => {
  const context = useContext(ViewContext);

  if (!context) {
    return <div>loading</div>;
  }
  const { stream, address } = context;

  return (
    <div className="h-screen flex">
      <div className="absolute top-0 left-0 m-3 w-1/2 flex flex-row space-x-2">
        <div className="hidden lg:block">
          <MintButton address={address} />
        </div>
        <ShareButton />
        <NetworkDropdown>
          <ViewOnOpensea address={address} />
          <ViewOnRarible address={address} />
        </NetworkDropdown>
      </div>
      <div className="lg:hidden absolute bottom-0 w-full my-2 flex items-center justify-center">
        <MintButton address={address} />
      </div>
      <iframe
        src={PlayerURL + stream?.id + "&chat=false"}
        className="w-full h-full"
      />
    </div>
  );
};

export default WatchComponent;
