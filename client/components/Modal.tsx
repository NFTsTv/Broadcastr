import React from "react";

const Modal = ({
  onExit,
  children,
}: {
  onExit: () => void;
  children: React.ReactNode;
}) => {
  return (
    <div className="absolute z-20 w-80 m-auto h-full">
      <div className="flex bg-base-200 p-8 rounded-lg relative w-full shadow-xl h-full">
        {children}
      </div>
    </div>
  );
};

export default Modal;
