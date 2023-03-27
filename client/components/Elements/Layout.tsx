import { ReactNode } from "react";
import Modal from "components/Elements/Modal";

export const Layout = ({ children }: { children: ReactNode }) => (
  <div className="h-screen mx-auto w-screen bg-base-300 flex flex-col overflow-auto">
    <Modal />
    {children}
  </div>
);
