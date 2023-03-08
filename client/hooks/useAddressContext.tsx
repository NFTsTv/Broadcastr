import { useContext } from "react";
import AddressContext from "context/addressContext";

const useAddressContext = () => {
  const context = useContext(AddressContext);
  if (!context)
    throw new Error(
      "useModalContext must be used within a ModalContextProvider"
    );
  return context;
};

export default useAddressContext;