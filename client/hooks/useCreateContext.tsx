import React from "react";
import { CreateContext } from "context/createContext";

const useCreateContext = () => {
  const context = React.useContext(CreateContext);
  if (!context)
    throw new Error(
      "useCreateContext must be used within a CreateContextProvider"
    );
  return context;
};

export default useCreateContext;
