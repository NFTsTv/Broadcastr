import useAddressContext from "hooks/useAddressContext";
import useCastr from "hooks/useCastr";
import { useAccount, useEnsName } from "wagmi";

const ChatBar = () => {
  const { address } = useAddressContext();
  const { stream } = useCastr(address);
  const { isDisconnected, address: userAddress } = useAccount();
  const { data, isError, isLoading } = useEnsName(userAddress);

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className="flex flex-col w-full lg:w-1/4 min-w-[350px] h-full min-h-[350px] p-1">
      {isDisconnected ? (
        <>
          <iframe
            className="flex h-[calc(100%-3.6rem)]"
            src={`https://stingray-app-u9f8x.ondigitalocean.app/${
              stream?.id
            }?isCastr=${true}`}
          />
          <p className="h-14">Connect your account to chat</p>
        </>
      ) : (
        <>
          <iframe
            className="flex h-full mb-3"
            src={`https://stingray-app-u9f8x.ondigitalocean.app/${
              stream?.id
            }?isCastr=${false}&address=${data ? data : userAddress}`}
          />
        </>
      )}
    </div>
  );
};

export default ChatBar;
