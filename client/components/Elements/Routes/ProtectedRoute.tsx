import { ReactNode } from "react";
import { useAccount, useContractRead, Address } from "wagmi";
import Login from "components/Elements/Login";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const {isDisconnected } = useAccount();

  if (isDisconnected) return <Login />;

  return <>{children}</>;
};

export default ProtectedRoute;
