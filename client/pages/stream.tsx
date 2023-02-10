import { useRouter } from "next/router";
import WebcamView from "components/Webcam";
import type { NextPage } from "next";

const Stream: NextPage = () => {
  const router = useRouter();
  const { address } = router.query;

  if (!address) {
    return <div>Loading</div>;
  }
  return (
    <div className="flex flex-col h-screen">
      <WebcamView address={address as string} />
    </div>
  );
};

export default Stream;
