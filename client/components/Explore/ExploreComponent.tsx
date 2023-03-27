import useCastrChannels from "hooks/useCastrChannels";
import CastrExploreCard from "./CastrExploreCard";
import Navbar from "components/Elements/Navbar";
import ViewOnPlatform from "components/Buttons/ViewOnPlatform";
import ShareButton from "components/Share/Button";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const ExploreComponent = () => {
  const { castrChannels } = useCastrChannels();
  // if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Navbar>
        <ConnectButton
          accountStatus={{
            smallScreen: "full",
            largeScreen: "full",
          }}
          showBalance={false}
        />
      </Navbar>
      <div className="bg-base-300 p-2 sm:p-4">
        <h1 className="m-5 rainbow_text_animated">Explore all available livestreams</h1>
        <div className="flex h-full flex-col sm:flex-row  flex-wrap justify-center overflow-auto">
          {castrChannels.map((channel) => (
            <CastrExploreCard address={channel} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ExploreComponent;
