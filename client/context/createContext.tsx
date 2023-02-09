import { createContext, ReactNode, useState } from "react";
import { parseEther } from "ethers/lib/utils";

export interface liveNFTFormControl {
  name: string;
  price: string;
  description: string;
  limitedSupply: boolean;
  totalSupply: string;
  baseUri?: string;
}

interface handleSetDataParameters {
  (key: keyof liveNFTFormControl, value: string | boolean): void;
}

interface ContextType {
  liveNFT: liveNFTFormControl;
  handleSetData: handleSetDataParameters;
  formError: string | undefined;
  validateFormData: () => boolean;
}

interface Props {
  children: ReactNode;
}

export const CreateContext = createContext<ContextType | undefined>(undefined);

export function CreateContextProvider(props: Props) {
  const [formError, setError] = useState<string | undefined>();

  const [liveNFT, setLiveNFT] = useState<liveNFTFormControl>({
    name: "",
    price: "",
    description: "",
    limitedSupply: false,
    totalSupply: "",
  });

  const handleSetData: handleSetDataParameters = (key, value) => {
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
    if (liveNFT.limitedSupply) {
      if (!liveNFT.totalSupply || isNaN(Number(liveNFT.totalSupply))) {
        return false;
      }
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
