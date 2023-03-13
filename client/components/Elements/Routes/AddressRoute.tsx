import { ReactNode } from "react";
import { AddressContextProvider } from "context/addressContext";
import { useRouter } from "next/router";

const AddressRoute = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { address } = router.query;

  return (
    <AddressContextProvider address={address as string}>
      {children}
    </AddressContextProvider>
  );
};

export default AddressRoute;
