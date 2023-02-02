import React from "react";
import { useRouter } from "next/router";
import { useAccount, useContractRead } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Container from "./container";
import factoryContract from "contracts/factory-abi";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className=" h-screen mx-auto w-screen">{children}</div>
);
const contractAddress = process.env.NEXT_PUBLIC_FACTORY_CONTRACT_ADDRESS ?? "";
const protectedRoutes = ["/", "/create", "/list", "/golive"];

const Router = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const route = router.pathname;
  const { isConnected, address, status } = useAccount();
  console.log(status);
  const [isLoading, setIsLoading] = React.useState(true);
  const {
    data,
    isLoading: loadingRead,
  } = useContractRead({
    addressOrName: contractAddress,
    contractInterface: factoryContract,
    functionName: "getCreatorChannels",
    args: [address],
  });

  console.log(data);
  React.useEffect(() => {
    if (protectedRoutes.includes(route) && !loadingRead) {
      if (data?.length === 0 && route !== "/create") {
        router.push("/create");
      } else if (data && data?.length > 0 && route !== "/golive") {
        router.push("/golive?address=" + data[0]);
      } else {
        setIsLoading(false);
      }
    } else if (!protectedRoutes.includes(route)) {
      setIsLoading(status === "reconnecting");
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

  if (protectedRoutes.includes(route) && !isConnected) {
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
