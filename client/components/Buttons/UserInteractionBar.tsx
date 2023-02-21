import { useContext } from "react";

import { ViewContext } from "context/viewContext";
import { ViewOnOpensea, ViewOnRarible } from "./ViewOnPlatform";
import ShareButton from "components/Share/Button";



const UserInteractionBar = () => {
  const context = useContext(ViewContext);
  if (!context) {
    return <div>loading</div>;
  }

  const { address, displayVodContent, setDisplayVodContent, sessions } =
    context;
  return (
    <div className="flex flex-row flex-wrap space-x-2 space-y-2 m-3">
      {/* {sessions && sessions.length > 0 && (
        <Button
          styles="btn-outline btn-sm btn-secondary"
          onClick={() => setDisplayVodContent(!displayVodContent)}
        >
          {displayVodContent ? "Live Stream" : "VOD Content"}
        </Button>
      )} */}
      <ShareButton />
      <ViewOnOpensea address={`${address}/1`} />
      <ViewOnRarible address={`${address}:1`} />
    </div>
  );
};

export default UserInteractionBar;
