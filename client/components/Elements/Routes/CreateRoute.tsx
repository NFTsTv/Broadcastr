import useCastrAccount from "hooks/useCastrAccount";
import IsLoading from "components/Elements/IsLoading";
import { useEffect, useState } from "react";
import router from "next/router";
import { Routes } from "utils/constants";
import { ReactNode } from "react";

const CreateRoute = ({ children }: { children: ReactNode }) => {
  const { castrAddress, loadingComplete } = useCastrAccount();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (castrAddress) {
      router.push(Routes.CAST + "?address=" + castrAddress);
    } else if (loadingComplete) {
      setIsLoading(false);
    }
  }, [castrAddress, loadingComplete]);

  if (isLoading) return <IsLoading />;

  return <>{children}</>;
};

export default CreateRoute;
