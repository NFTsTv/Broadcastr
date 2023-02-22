import { NextPage } from "next";
import { ViewContextProvider } from "context/viewContext";
import WatchComponent from "components/Watch";
const Home: NextPage = () => {
  const address = "0xccc50676b8919656f3c50f9b0903fbaa0e09f58b";

  return (
    <ViewContextProvider address={address}>
      <WatchComponent />
    </ViewContextProvider>
  );
};

export default Home;
