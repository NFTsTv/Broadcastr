import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAccount, useContractRead } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Container from "components/Elements/Container";
import factoryContract from "contracts/factory-abi";
import { Routes, ProtectedRutes, ContractAddress } from "utils/constants";

const Layout = ({ children }: { children: ReactNode }) => (
  <div className=" h-screen mx-auto w-screen">{children}</div>
);

const Router = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const route = router.pathname as Routes;
  const { isConnected, address, status } = useAccount();
  const [isLoading, setIsLoading] = useState(true);
  const { data, isLoading: loadingRead } = useContractRead({
    addressOrName: ContractAddress,
    contractInterface: factoryContract,
    functionName: "getCreatorChannels",
    args: [address],
  });

  useEffect(() => {
    if (ProtectedRutes.includes(route) && !loadingRead) {
      if (data?.length === 0 && route !== Routes.CREATE) {
        router.push(Routes.CREATE);
      } else if (data && data?.length > 0 && route !== Routes.CAST) {
        router.push(Routes.CAST + "?address=" + data[0]);
      } else {
        setIsLoading(false);
      }
    } else if (!ProtectedRutes.includes(route)) {
      console.log(route, isLoading)

      setIsLoading(false);
    }
  }, [isConnected, status, data, route, router, loadingRead]);

  if (isLoading) {
    return (
      <Layout>
        <Container>
          <h1 className="text-4xl font-bold">loading...</h1>
        </Container>
      </Layout>
    );
  }

  if (ProtectedRutes.includes(route) && !isConnected) {
    return (
      <Layout>
        <Container>
          <h1 className="text-4xl font-bold">NFTS are live</h1>
          <p className="text-xl text-center">
            Welcome to NFTs are live! Connect your wallet to get started
          </p>
          <div className="w-40 m-auto">
            <ConnectButton />
          </div>
        </Container>
      </Layout>
    );
  }

  return <Layout>{children}</Layout>;
};

export default Router;
