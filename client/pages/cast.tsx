import type { NextPage } from "next";
import { useRouter } from "next/router";
import { ViewContextProvider } from "context/viewContext";
import CastComponent from "components/Cast/CastComponent";

const Cast: NextPage = () => {
  const router = useRouter();
  const { address } = router.query;

  if (!address) {
    return <div>loading</div>;
  }

  return (
    <ViewContextProvider address={address as string}>
      <CastComponent />
    </ViewContextProvider>
  );
};

export default Cast;
