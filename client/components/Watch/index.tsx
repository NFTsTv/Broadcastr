import { useContext } from "react";
import { ViewContext } from "context/viewContext";
import { PlayerURL } from "utils/constants";
import NetworkDropdown from "components/Elements/NetworkDropdown";
import {
  ViewOnOpensea,
  ViewOnRarible,
  ViewOnNftScan,
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
    <div className="h-full flex flex-col lg:flex-row w-full">
      <div className="h-full w-full flex flex-col">
        <iframe
          src={PlayerURL + stream?.id + "&chat=false"}
          className="h-full w-full"
        />
        <div className="p-3 box-content flex flex-row">test</div>
      </div>
      <iframe
        className="h-3/5 w-full lg:w-1/4 lg:h-full bg-zinc-800 bg-opacity-80"
        src="https://stingray-app-u9f8x.ondigitalocean.app/29f8d219-d76c-4019-81bc-b46ac20453dc"
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default WatchComponent;
