import useCastrAccount from "hooks/useCastrAccount";
import IsLoading from "components/Elements/IsLoading";
import useAddressContext from "hooks/useAddressContext";
import { useEffect, useState } from "react";
import router from "next/router";
import { Routes } from "utils/constants";
import { ReactNode } from "react";

const CastRoute = ({ children }: { children: ReactNode }) => {
  const { isOwned, castrAddress, loadingComplete } = useCastrAccount();
  const [isLoading, setIsLoading] = useState(true);
  const { address } = useAddressContext();
  useEffect(() => {
    if (loadingComplete && !castrAddress) {
      router.push(Routes.CREATE);
    } else if ((address && !isOwned(address)) || !address) {
      router.push(Routes.CAST + "?address=" + castrAddress);
    } else {
      setIsLoading(false);
    }
  }, [address, isOwned]);

  if (isLoading) return <IsLoading />;

  return <>{children}</>;
};

export default CastRoute;
