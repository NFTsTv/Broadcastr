import { PlayerURL } from "utils/constants";
import useCastr from "hooks/useCastr";
import useAddressContext from "hooks/useAddressContext";

const NFTEmbed = ({ chat }: { chat: boolean }) => {
  const { address } = useAddressContext();
  const { stream } = useCastr(address);
  const constructURL = () => {
    if (!chat) {
      return PlayerURL + stream?.id + "&chat=false";
    } else {
      return PlayerURL + stream?.id;
    }
  };

  return (
    <iframe
      src={constructURL() }
      className="min-h-[250px] w-full lg:h-full aspect-video"
    />
  );
};

export default NFTEmbed;