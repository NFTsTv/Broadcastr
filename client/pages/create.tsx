import type { NextPage } from "next";
import { CreateContextProvider } from "context/createContext";
import CreateComponent from "components/Create";

const Create: NextPage = () => {
  return (
    <CreateContextProvider>
      <CreateComponent />
    </CreateContextProvider>
  );
};

export default Create;
