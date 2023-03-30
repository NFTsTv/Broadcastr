import { ReactNode } from "react";
import Modal from "components/Elements/Modal";
import Alert from "components/Elements/Alert";
export const Layout = ({ children }: { children: ReactNode }) => (
  <div className="h-screen mx-auto w-screen bg-base-300 flex flex-col overflow-auto">
    <Modal />
    <Alert />
    {children}
  </div>
);
