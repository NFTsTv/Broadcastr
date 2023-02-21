import { NextPage } from "next";
import { useRouter } from "next/router";
import { ViewContextProvider } from "context/viewContext";
import WatchComponent from "components/Watch";
import NetworkDropdown from "components/Elements/UserInteractionBar";
import {
  ViewOnOpensea,
  ViewOnRarible,
} from "components/Buttons/ViewOnPlatform";
import MintButton from "components/Buttons/MintButton";
const Home: NextPage = () => {
  const router = useRouter();
  const address = "0xccc50676b8919656f3c50f9b0903fbaa0e09f58b";

  return (
    <ViewContextProvider address={address}>
      <div className="absolute top-0 left-0 m-3 w-1/2 flex flex-row space-x-2">
        <div className="hidden lg:block">
          <MintButton address={address} />
        </div>
        <NetworkDropdown>
          <ViewOnOpensea address={address} />
          <ViewOnRarible address={address} />
        </NetworkDropdown>
      </div>
      <div className="lg:hidden absolute bottom-0 w-full my-2 flex items-center justify-center">
        <MintButton address={address} />
      </div>
      <WatchComponent />
    </ViewContextProvider>
  );
};

export default Home;
