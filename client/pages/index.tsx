import type { NextPage } from "next";
import { CreateContextProvider } from "context/createContext";
import ProtectedRoute from "components/Elements/Routes/ProtectedRoute";
import CreateRoute from "components/Elements/Routes/CreateRoute";

const Create: NextPage = () => {
  return (
    <CreateContextProvider>
      <ProtectedRoute>
        <CreateRoute>
          loading
        </CreateRoute>
      </ProtectedRoute>
    </CreateContextProvider>
  );
};

export default Create;
