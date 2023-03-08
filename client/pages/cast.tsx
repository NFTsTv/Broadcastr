import type { NextPage } from "next";
import { ViewContextProvider } from "context/viewContext";
import CastComponent from "components/Cast/CastComponent";

import AddressRoute from "components/Elements/Routes/AddressRoute";
import ProtectedRoute from "components/Elements/Routes/ProtectedRoute";
import CastRoute from "components/Elements/Routes/CastRoute";

const Cast: NextPage = () => {
  return (
    <ProtectedRoute>
      <AddressRoute>
        <CastRoute>
          <CastComponent />
        </CastRoute>
      </AddressRoute>
    </ProtectedRoute>
  );
};

export default Cast;
