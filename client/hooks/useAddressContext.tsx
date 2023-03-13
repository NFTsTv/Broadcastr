import { useContext } from "react";
import AddressContext from "context/addressContext";

const useAddressContext = () => {
  const context = useContext(AddressContext);
  if (!context)
    throw new Error(
      "useModalContext must be used within a AddressContextProvider"
    );
  return context;
};

export default useAddressContext;