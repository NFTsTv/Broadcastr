import React from "react";

const SuccessModal = (onExit: () => void) => {
  return (
    <div className="absolute z-20 visible w-full p-10 box-content m-auto">
      <div className="modal-box relative">
        <label
          htmlFor="my-modal-3"
          className="btn btn-sm btn-circle absolute right-2 top-2"
          onClick={onExit}
        >
          ✕
        </label>
        <h3 className="text-lg font-bold">
          Congratulations random Internet user!
        </h3>
        <p className="py-4">You've just created a Live NFT! :D</p>
      </div>
    </div>
  );
};

export default SuccessModal;
