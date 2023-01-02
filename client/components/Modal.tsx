import React from "react";

const Modal = ({
  onExit,
  children,
}: {
  onExit: () => void;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex absolute top-0 right-0 z-20 w-full h-full m-0">
      <div className=" bg-base-100 p-8 rounded-lg relative">
        {children}
      </div>
    </div>
  );
};

export default Modal;
