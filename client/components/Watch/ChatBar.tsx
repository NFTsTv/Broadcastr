import useAddressContext from "hooks/useAddressContext";
import useCastr from "hooks/useCastr";


const ChatBar = () => {

  const { address } = useAddressContext();
  const { stream } = useCastr(address);

  return(
    <iframe
    className="flex-grow w-full lg:w-1/4 lg:h-full bg-zinc-800 bg-opacity-80 min-h-[350px]"
    src={`https://stingray-app-u9f8x.ondigitalocean.app/${stream?.id}`}
  />
  )

}

export default ChatBar;