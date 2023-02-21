import { ShareBox } from "components/Share/Box";
import Button from "components/Buttons/Button";
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
      <Button styles="btn-info">
        <label htmlFor="my-modal-4">Share</label>
      </Button>
    </>
  );
};

export default ShareButton;
