import React, { createContext, ReactNode } from "react";

export interface liveNFTFormControl {
  name: string;
  description: string;
  price: string;
  totalSupply: string;
  baseUri?: string;
}

interface ContextType {
  liveNFT: liveNFTFormControl;
  setLiveNFT: (data: liveNFTFormControl) => void;
}

interface Props {
  children: ReactNode;
}

export const CreateContext = createContext<ContextType | undefined>(undefined);

export function CreateContextProvider(props: Props) {
  const [liveNFT, setLiveNFT] = React.useState({
    name: "",
    description: "",
    price: "0",
    totalSupply: "0",
  });
  return (
    <CreateContext.Provider value={{ liveNFT, setLiveNFT }}>
      {props.children}
    </CreateContext.Provider>
  );
}
