import React from "react";
import useLiveNFT from "hooks/useLiveNFT";
import { useRouter } from "next/router";
import { Player } from "@livepeer/react";
import MintButton from "components/Buttons/MintButton";

const OfflineView = ({ address }: { address: string }) => {
  return (
    <div className="bg-gray-900 flex flex-col items-center justify-center h-screen w-screen text-white">
      <h1>the stream is offline</h1>
      <MintButton address={address} />
    </div>
  );
};

const View = () => {
  const router = useRouter();
  const { address } = router.query;
  const { stream, lnftData } = useLiveNFT(address as string);
  if(!address) {
    return <div>loading...</div>
  }

  if (!stream || !stream.isActive) {
    return <OfflineView address={address as string} />;
  }

  return (
    <div>
      <Player src={stream.playbackUrl} />
    </div>
  );
};

export default View;
