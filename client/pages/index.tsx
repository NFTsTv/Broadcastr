import { NextPage } from "next";
import { ViewContextProvider } from "context/viewContext";
import WatchComponent from "components/Watch";
const Home: NextPage = () => {
  const address = "0xC36DB9d429CAbC3178358fa772Dc9f60428E2D10";

  return (
    <ViewContextProvider address={address}>
      <WatchComponent />
    </ViewContextProvider>
  );
};

export default Home;
