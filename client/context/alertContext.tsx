import { createContext, ReactNode, useState, useEffect } from "react";

export enum AlertType {
  success = "success",
  error = "error",
  warning = "warning",
  info = "info",
}

interface Alert {
  content: string;
  type: AlertType;
}

interface AlertContextType {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  alert: Alert;
  setAlert: (alert: Alert) => void;
}

interface Props {
  children: ReactNode;
}

export const AlertContext = createContext<AlertContextType | undefined>(
  undefined
);

export function AlertContextProvider(props: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [alert, setAlert] = useState<Alert>({
    content: "",
    type: AlertType.info,
  });

  useEffect(() => {
    if (alert.content) {
      setIsOpen(true);
    }
  }, [alert]);
  


  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsOpen(false);
      }, 5000);
    }
  }, [isOpen]);

  return (
    <AlertContext.Provider
      value={{
        isOpen,
        setIsOpen,
        alert,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
}
