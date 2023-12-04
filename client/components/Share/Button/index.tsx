import { ShareBox } from "components/Share/Box";
import Button from "components/Buttons/Button";
import useModalContext from "hooks/useModalContext";
import useAddressContext from "hooks/useAddressContext";
const ShareButton = () => {
  const { isOpen, setIsOpen, setModalContent } = useModalContext();
  const { address } = useAddressContext();
  const handleClick = () => {
    setIsOpen(!isOpen);
    setModalContent(<ShareBox title="Share your stream" address={address} />);
  };

  return (
    <Button styles="btn-sm" onClick={handleClick}>
      Share
    </Button>
  );
};

export default ShareButton;
