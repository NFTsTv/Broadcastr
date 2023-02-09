import { createContext, ReactNode, useState } from "react";
import { parseEther } from "ethers/lib/utils";

export interface CastrFormControl {
  name: string;
  price: string;
  description: string;
  limitedSupply: boolean;
  totalSupply: string;
  baseUri?: string;
}

interface handleSetDataParameters {
  (key: keyof CastrFormControl, value: string | boolean): void;
}

interface ContextType {
  Castr: CastrFormControl;
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

  const [Castr, setCastr] = useState<CastrFormControl>({
    name: "",
    price: "",
    description: "",
    limitedSupply: false,
    totalSupply: "",
  });

  const handleSetData: handleSetDataParameters = (key, value) => {
    setCastr({ ...Castr, [key]: value });
  };

  function validateFormData(): boolean {
    if (!Castr.name || typeof Castr.name !== "string") {
      return false;
    }
    if (!Castr.description || typeof Castr.description !== "string") {
      return false;
    }
    try {
      parseEther(Castr.price);
    } catch {
      return false;
    }
    if (Castr.limitedSupply) {
      if (!Castr.totalSupply || isNaN(Number(Castr.totalSupply))) {
        return false;
      }
    }
    if (!Castr.baseUri || typeof Castr.baseUri !== "string") {
      return false;
    }
    setError(undefined);
    return true;
  }

  return (
    <CreateContext.Provider
      value={{ Castr, handleSetData, formError, validateFormData }}
    >
      {props.children}
    </CreateContext.Provider>
  );
}
