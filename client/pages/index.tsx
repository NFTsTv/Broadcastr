import { NextPage } from "next";
import { ViewContextProvider } from "context/viewContext";
import WatchComponent from "components/Watch";
const Home: NextPage = () => {
  const address = "0x8140c9647779034efef6d492f3ecccde66a6191d";

  return (
    <ViewContextProvider address={address}>
      <WatchComponent />
    </ViewContextProvider>
  );
};

export default Home;
