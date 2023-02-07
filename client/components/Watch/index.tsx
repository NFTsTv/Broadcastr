import React from "react";
import { ViewContext } from "context/viewContext";
import { Player } from "@livepeer/react";
import OfflineView from "components/Watch/OfflineView";
import VodView from "./VodView";

const WatchComponent = () => {
  const context = React.useContext(ViewContext);
  
  if (!context) {
    return <div>loading</div>;
  }
  const { displayVodContent, activeSrc } = context;
  console.log("test")
  if (activeSrc) {
    return (
      <div className="h-screen flex">
        <Player  src={activeSrc} />
      </div>
    );
  }

  if (displayVodContent) {
    return <VodView />;
  }

  return <OfflineView />;
};

export default WatchComponent;
