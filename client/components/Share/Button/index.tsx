import { ShareBox } from "components/Share/Box";
import Button from "components/Buttons/Button";
import useModalContext from "hooks/useModalContext";

const ShareButton = () => {
  const { isOpen, setIsOpen, setModalContent } = useModalContext();

  const handleClick = () => {
    setIsOpen(!isOpen);
    setModalContent(<ShareBox title="Share your stream" />);
  };

  return <Button onClick={handleClick}>Share</Button>;
};

export default ShareButton;
