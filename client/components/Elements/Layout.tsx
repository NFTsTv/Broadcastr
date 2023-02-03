import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import Container from "./Container";
const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className=" h-screen mx-auto">
    <div className="flex justify-center align-center h-full w-full ">
      {children}
    </div>
  </div>
);

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isConnected, status } = useAccount();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoggedIn(isConnected);
    setIsLoading(status === "reconnecting");
  }, [isConnected, status]);

  if (isLoading) {
    return (
      <Layout>
        <Container>
          <h1 className="text-4xl font-bold">Reconnecting...</h1>
          <p className="text-xl text-center">Reconnecting to your wallet...</p>
        </Container>
      </Layout>
    );
  }

  if (!isLoggedIn) {
    return (
      <Layout>
        <Container>
          <h1 className="text-4xl font-bold">NFTS are live</h1>
          <p className="text-xl text-center">
            Welcome to NFTs are live! Connect your wallet to get started
          </p>
          <div className="w-40 m-auto"><ConnectButton /></div>
          
        </Container>
      </Layout>
    );
  }

  return <Layout>{children}</Layout>;
};

export default MainLayout;
