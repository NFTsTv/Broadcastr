import React, { createContext, ReactNode } from "react";
import { parseEther } from "ethers/lib/utils";
export interface liveNFTFormControl {
  name: string;
  description: string;
  price: string;
  totalSupply: string;
  baseUri?: string;
}

interface ContextType {
  liveNFT: liveNFTFormControl;
  handleSetData: (key: keyof liveNFTFormControl, value: string) => void;
  formError: string | undefined;
  validateFormData: () => boolean;
}

interface Props {
  children: ReactNode;
}

export const CreateContext = createContext<ContextType | undefined>(undefined);

export function CreateContextProvider(props: Props) {
  const [formError, setError] = React.useState<string | undefined>();

  const [liveNFT, setLiveNFT] = React.useState<liveNFTFormControl>({
    name: "",
    description: "",
    price: "",
    totalSupply: "",
  });

  const handleSetData = (key: keyof liveNFTFormControl, value: string) => {
    setLiveNFT({ ...liveNFT, [key]: value });
  };

  function validateFormData(): boolean {
    if (!liveNFT.name || typeof liveNFT.name !== "string") {
      return false;
    }
    if (!liveNFT.description || typeof liveNFT.description !== "string") {
      return false;
    }
    try {
      parseEther(liveNFT.price);
    } catch {
      return false;
    }
    if (!liveNFT.totalSupply || isNaN(Number(liveNFT.totalSupply))) {
      return false;
    }
    if (!liveNFT.baseUri || typeof liveNFT.baseUri !== "string") {
      return false;
    }
    setError(undefined);
    return true;
  }

  return (
    <CreateContext.Provider
      value={{ liveNFT, handleSetData, formError, validateFormData }}
    >
      {props.children}
    </CreateContext.Provider>
  );
}
