import { useContext } from "react";
import { ViewContext } from "context/viewContext";
import { PlayerURL } from "utils/constants";

const WatchComponent = () => {
  const context = useContext(ViewContext);

  if (!context) {
    return <div>loading</div>;
  }
  const { stream } = context;

  return (
    <div className="h-screen flex">
      <iframe src={PlayerURL + stream?.id} className="w-full h-full" />
    </div>
  );
};

export default WatchComponent;
