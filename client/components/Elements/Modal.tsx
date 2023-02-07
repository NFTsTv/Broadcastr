import React from "react";
import GoBackButton from "components/Buttons/GoBackButton";
const Modal = ({
  onExit,
  children,
}: {
  onExit: () => void;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex absolute top-0 right-0 z-20 w-full h-full m-0 overflow-hidden">
      <div className=" bg-base-100 p-8 rounded-lg relative mt-4">
        <div className=" text-white absolute top-0 left-0 px-5 cursor-pointer">
          <GoBackButton onClick={() => onExit()} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
