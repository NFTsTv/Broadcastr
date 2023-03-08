import { createContext, ReactNode } from "react";
interface ContextType {
  address: string;
}

interface Props {
  address: string;
  children: ReactNode;
}

const AddressContext = createContext<ContextType | undefined>(undefined);

export function AddressContextProvider(props: Props) {
  return (
    <AddressContext.Provider
      value={{
        address: props.address,
      }}
    >
      {props.children}
    </AddressContext.Provider>
  );
}

export default AddressContext;