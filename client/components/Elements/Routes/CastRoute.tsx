import useCastrAccount from "hooks/useCastrAccount";
import IsLoading from "components/Elements/IsLoading";
import useAddressContext from "hooks/useAddressContext";
import { useEffect } from "react";
import router from "next/router";
import { Routes } from "utils/constants";
import { ReactNode } from "react";

const CastRoute = ({ children }: { children: ReactNode }) => {
  const { isOwned, castrAddress, loadingComplete } = useCastrAccount();

  const { address } = useAddressContext();
  useEffect(() => {
    if (address) {
      if (!isOwned(address)) {
        router.push(Routes.CAST + "?address=" + castrAddress);
      }
    } else {
      router.push(Routes.CAST + "?address=" + castrAddress);
    }
  }, [address, isOwned]);

  if (!loadingComplete) return <IsLoading />;

  return <>{children}</>;
};

export default CastRoute;
