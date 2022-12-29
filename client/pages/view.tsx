import React from "react";
import useLiveNFT from "hooks/useLiveNFT";
import { useRouter } from "next/router";
import { Player } from "@livepeer/react";
import UserInteractionBar from "components/Buttons/UserInteractionBar";
const OfflineView = ({ address }: { address: string }) => {
  return (
    <div className=" flex flex-col items-center justify-center h-screen w-screen">
      <h1>the stream is offline</h1>
      <UserInteractionBar address={address} />
    </div>
  );
};

const View = () => {
  const router = useRouter();
  const { address } = router.query;
  const [activeSrc, setActiveSrc] = React.useState<string | null>(null);
  const { stream, lnftData } = useLiveNFT(address as string);

  React.useEffect(() => {
    if (stream && stream.isActive && stream.playbackUrl !== activeSrc) {
      setActiveSrc(stream.playbackUrl);
    }
  }, [stream]);

  if (!address) {
    return <div>loading...</div>;
  }

  if (!stream || !stream.isActive) {
    return <OfflineView address={address as string} />;
  }

  return (
    <div className="h-screen flex">
      <div className="absolute top-0 left-0 z-10">
        <UserInteractionBar address={address as string} />
      </div>
      <Player src={stream.playbackUrl} />
    </div>
  );
};

export default View;
