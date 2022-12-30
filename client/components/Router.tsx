import React from "react";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Container from "./container";

const Router = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const route = router.pathname;
  const { isConnected, status } = useAccount();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (unprotectedRoutes.includes(route)) setIsLoading(false);
    setIsLoading(status === "reconnecting");
  }, [isConnected, status]);

  const protectedRoutes = ["/", "/create", "/stream", "/golive"];

  const unprotectedRoutes = ["/view"];

  if (isLoading) {
    return (
      <Container>
        <h1 className="text-4xl font-bold">loading...</h1>
      </Container>
    );
  }

  if (protectedRoutes.includes(route) && !isConnected) {
    return (
      <Container>
        <h1 className="text-4xl font-bold">NFTS are live</h1>
        <p className="text-xl text-center">
          Welcome to NFTs are live! Connect your wallet to get started
        </p>
        <div className="w-40 m-auto">
          <ConnectButton />
        </div>
      </Container>
    );
  }

  return <>{children}</>;
};

export default Router;
