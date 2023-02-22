import { ShareBox } from "components/Share/Box";
import Button from "components/Buttons/Button";
const DetailsModal = () => {
  return (
    <div className="absolute">
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative bg-base-300" htmlFor="">
          <ShareBox title="Share your stream" />
        </label>
      </label>
    </div>
  );
};

const ShareButton = () => {
  return (
    <>
      <DetailsModal />
      <Button htmlFor="my-modal-4">
        Share
      </Button>
    </>
  );
};

export default ShareButton;
