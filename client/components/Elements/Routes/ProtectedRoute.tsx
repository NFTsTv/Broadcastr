import { ReactNode, useState, useEffect } from "react";
import { useAccount, useContractRead, Address } from "wagmi";
import Login from "components/Elements/Login";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const {isDisconnected, isConnecting, isConnected } = useAccount();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    setAllowed(!isDisconnected);
  }, [isDisconnected, isConnecting, isConnected]);

  if (!allowed) return <Login />;

  return <>{children}</>;
};

export default ProtectedRoute;
