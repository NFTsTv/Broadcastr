import React from "react";
import { ShareBox } from "components/Share/Box";
const DetailsModal = () => {
  return (
    <>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative bg-base-300" htmlFor="">
          <ShareBox title="Share your stream" />
        </label>
      </label>
    </>
  );
};

const ShareButton = () => {
  return (
    <>
      <DetailsModal />
      <label
        htmlFor="my-modal-4"
        className="btn btn-sm btn-secondary text-white m-1"
      >
        Share
      </label>
    </>
  );
};

export default ShareButton;
