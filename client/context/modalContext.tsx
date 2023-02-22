import { createContext, ReactNode, useState } from "react";

interface ModalContextType {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  modalContent: ReactNode;
  setModalContent: (value: ReactNode) => void;
}

interface Props {
  children: ReactNode;
}

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);

export function ModalContextProvider(props: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>();

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        setIsOpen,
        modalContent,
        setModalContent,
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
}

