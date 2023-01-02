import type { NextPage } from "next";
import React from "react";
import Container from "components/container";
import Menu from "components/Menu";
import { useRouter } from "next/router";
import useLiveNFT from "hooks/useLiveNFT";
import UseWebcam from "components/goLive/UseWebcam";
import UseObs from "components/goLive/UseObs";
import UseTestStream from "components/goLive/UseTestSignal";
import ViewComponent from "components/view/ViewComponent";
import { ViewContextProvider } from "context/viewContext";

const Create: NextPage = () => {
  const router = useRouter();
  const { address } = router.query;
  const { stream } = useLiveNFT(address as string);

  if (!stream || !address) return <div>Loading...</div>;

  return (
    <div className="flex h-screen lg:flex-row flex-col-reverse">
      <div className="flex flex-col p-5 space-y-5 h-full lg:w-1/4 relative">
        <Menu />
        <h1>Go live on your LNFT!</h1>
        <p>Stream directly into you LNFT using on of the following methods:</p>
        <div className="flex flex-col">
          <UseObs stream={stream} />
          <UseWebcam address={address as string} />
          <UseTestStream stream={stream} />
        </div>
      </div>
      <div className="flex flex-col h-1/3 lg:w-3/4 lg:h-full border-1">
        <ViewContextProvider address={address as string}>
          <ViewComponent />
        </ViewContextProvider>
      </div>
    </div>
  );
};

export default Create;
