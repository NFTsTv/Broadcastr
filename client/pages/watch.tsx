import React from "react";
import { useRouter } from "next/router";
import { ViewContextProvider } from "context/viewContext";
import WatchComponent from "components/Watch";
import UserInteractionBar from "components/Buttons/UserInteractionBar";
const View = () => {
  const router = useRouter();
  const { address } = router.query;

  return (
    <ViewContextProvider address={address as string}>
      <div className="absolute top-0 left-0 z-10 ">
        <UserInteractionBar />
      </div>
      <WatchComponent />
    </ViewContextProvider>
  );
};

export default View;
