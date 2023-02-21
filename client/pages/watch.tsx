import { useRouter } from "next/router";
import { ViewContextProvider } from "context/viewContext";
import WatchComponent from "components/Watch";

const View = () => {
  const router = useRouter();
  const { address } = router.query;

  return (
    <ViewContextProvider address={address as string}>
      <WatchComponent />
    </ViewContextProvider>
  );
};

export default View;
