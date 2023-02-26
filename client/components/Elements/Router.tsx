import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAccount, useContractRead, Address } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Container from "components/Elements/Container";
import factoryContract from "contracts/CastrFactory-abi";
import { Routes, ProtectedRutes, ContractAddress } from "utils/constants";
import Image from 'next/image';

const Router = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const route = router.pathname as Routes;
  const { isConnected, address, status } = useAccount();
  const [isLoading, setIsLoading] = useState(true);
  const { data, isLoading: loadingRead } = useContractRead({
    address: ContractAddress,
    abi: factoryContract,
    functionName: "getCreatorChannels",
    args: [address],
  });

  useEffect(() => {
    const ArrayData = data as string[];
    if (ProtectedRutes.includes(route) && !loadingRead) {
      if (ArrayData?.length === 0 && route !== Routes.CREATE) {
        router.push(Routes.CREATE);
      } else if (data && ArrayData?.length > 0 && route !== Routes.CAST) {
        router.push(Routes.CAST + "?address=" + ArrayData[ArrayData.length - 1]);
      } else {
        setIsLoading(false);
      }
    } else if (!ProtectedRutes.includes(route)) {
      console.log(route, isLoading);

      setIsLoading(false);
    }
  }, [isConnected, status, data, route, router, loadingRead]);

  if (isLoading) {
    return (
      <Container>
        <h1 className="text-4xl font-bold">loading...</h1>
      </Container>
    );
  }

  if (ProtectedRutes.includes(route) && !isConnected) {
    return (
      <Container>
        <div className="flex flex-col items-center space-y-4">
          <div className="w-screen h-24 relative mt-10">
            <Image
              src="/logo.png"
              alt="Broadcastr Logo"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <h1 className="text-2xl text-center">
            Welcome to Broadcastr!
          </h1>

          <p className="text-center">
            Connect your wallet to get started.
          </p>
          <ConnectButton />
        </div>

      </Container>
    );
  }

  return <>{children}</>;
};

export default Router;
