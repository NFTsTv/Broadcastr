import GoBackButton from "components/Buttons/GoBackButton";
import useModalContext from "hooks/useModalContext";
const Modal = () => {
  const context = useModalContext();
  const { isOpen, setIsOpen, modalContent } = context;

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div
        className="absolute h-screen w-screen z-40"
        onClick={() => {
          setIsOpen(false);
        }}
      />
      <div className="modal-box z-50 p-10">
        <div className="text-white absolute top-0 right-0 px-4 cursor-pointer mt-3 z-50">
          <GoBackButton onClick={() => setIsOpen(false)} />
        </div>
        {modalContent}
      </div>
    </div>
  );
};

export default Modal;
