import useAddressContext from "hooks/useAddressContext";
import useCastr from "hooks/useCastr";


const ChatOverlay = () => {

  const { address } = useAddressContext();
  const { stream } = useCastr(address);
console.log(stream?.id)
  return(
    <iframe
    className="absolute top-0 z-60 w-full h-1/3"
    src={`https://stingray-app-u9f8x.ondigitalocean.app/${stream?.id}?isCastr=true`}
  />
  )

}

export default ChatOverlay;