import useCastrChannels from "hooks/useCastrChannels";
import CastrExploreCard from "./CastrExploreCard";
import Navbar from "components/Elements/Navbar";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import GoToChannel from "components/Buttons/GoToChannel";
const ExploreComponent = () => {
  const { castrChannels, updateLiveAddress } = useCastrChannels();
  
  return (
    <>
      <Navbar>
        <GoToChannel />
        <ConnectButton
          accountStatus={{
            smallScreen: "full",
            largeScreen: "full",
          }}
          showBalance={false}
        />
      </Navbar>
      <div className="p-2 sm:p-4">
        <h1 className="m-5 rainbow_text_animated ">
          Explore all available livestreams
        </h1>
        <div className="flex h-full flex-col sm:flex-row  flex-wrap justify-center overflow-auto">
          {castrChannels.map((channel) => (
            <CastrExploreCard address={channel} updateLiveAddress={updateLiveAddress} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ExploreComponent;
