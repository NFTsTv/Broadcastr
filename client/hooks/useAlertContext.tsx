import { useContext } from "react";
import { AlertContext } from "context/alertContext";

const useAlertContext = () => {
  const context = useContext(AlertContext);
  if (!context)
    throw new Error(
      "useAlertContext must be used within a AlertContextProvider"
    );
  return context;
};

export default useAlertContext;
