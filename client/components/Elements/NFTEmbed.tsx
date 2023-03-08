import { PlayerURL } from "utils/constants";
import useCastr from "hooks/useCastr";
import useAddressContext from "hooks/useAddressContext";

const NFTEmbed = ({ chat }: { chat: boolean }) => {
  const { address } = useAddressContext();
  const { stream } = useCastr(address);
  return (
    <iframe
      src={PlayerURL + stream?.id + "&chat=" + chat}
      className="min-h-[250px] w-full h-full"
    />
  );
};

export default NFTEmbed;