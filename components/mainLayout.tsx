import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

const Layout = ({ children }: { children: React.ReactNode }) =>  (
    <div className="max-w-md h-screen overflow-y-auto mx-auto">
      <div className="flex flex-col items-center justify-center h-full space-y-5 p-5 md:border-2 rounded-xl drop-shadow-md">
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
        <h1 className="text-4xl font-bold">Reconnecting...</h1>
        <p className="text-xl text-center">Reconnecting to your wallet...</p>
      </Layout>
    );
  }

  if (!isLoggedIn) {
    return (
      <Layout>
        <h1 className="text-4xl font-bold">NFTS are live</h1>
        <p className="text-xl text-center">
          Welcome to NFTs are live! Connect your wallet to get started
        </p>
        <ConnectButton />
      </Layout>
    );
  }

  return <Layout>{children}</Layout>;

};

export default MainLayout;
