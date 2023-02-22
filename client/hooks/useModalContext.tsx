import { useContext } from "react";
import { ModalContext } from "context/modalContext";

const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error(
      "useModalContext must be used within a ModalContextProvider"
    );
  return context;
};

export default useModalContext;
