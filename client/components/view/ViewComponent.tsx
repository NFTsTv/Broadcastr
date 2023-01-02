import React from "react";
import { ViewContext } from "context/viewContext";
import UserInteractionBar from "components/Buttons/UserInteractionBar";
import { Player } from "@livepeer/react";
import OfflineView from "components/view/OfflineView";
import VodView from "./VodView";

const ViewComponent = () => {
  const context = React.useContext(ViewContext);
  
  if (!context) {
    return <div>loading</div>;
  }
  const { displayVodContent, activeSrc } = context;

  if (activeSrc) {
    return (
      <div className="h-screen flex">
        <Player src={activeSrc} />
      </div>
    );
  }

  if (displayVodContent) {
    return <VodView />;
  }

  return <OfflineView />;
};

export default ViewComponent;
