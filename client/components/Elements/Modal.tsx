import { useContext } from "react";
import GoBackButton from "components/Buttons/GoBackButton";
import { ModalContext } from "context/modalContext";

const Modal = () => {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error("Modal must be used within a ModalContextProvider");

  const { isOpen, setIsOpen, modalContent } = context;

  if (!isOpen) return null;

  return (
    <div className="flex absolute top-0 right-0 z-20 w-full h-full m-0 overflow-hidden">
      <div className=" bg-base-100 p-8 rounded-lg relative mt-4">
        <div className=" text-white absolute top-0 left-0 px-5 cursor-pointer">
          <GoBackButton onClick={() => setIsOpen(false)} />
        </div>
        {modalContent}
      </div>
    </div>
  );
};

export default Modal;
