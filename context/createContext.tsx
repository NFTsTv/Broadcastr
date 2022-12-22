import React, { createContext, ReactNode } from "react";

export type LiveNFT = {
  name: string;
  description: string;
  price?: BigInt;
  baseUri?: string;
};

interface ContextType {
  liveNFT: LiveNFT;
  setLiveNFT: (data: LiveNFT) => void;
}

interface Props extends ContextType {
  children: ReactNode;
}

export const CreateContext = createContext<ContextType | undefined>(undefined);

export function CreateContextProvider(props: Props) {
  return (
    <CreateContext.Provider value={{ ...props }}>
      {props.children}
    </CreateContext.Provider>
  );
}
