import MintButton from "components/Buttons/MintButton";
import useAddressContext from "hooks/useAddressContext";
import useCastr from "hooks/useCastr";

const BottomControlBar = () => {
  const { address } = useAddressContext();
  const { CastrData } = useCastr(address);
  return (
    <div className="h-14 items-center p-3 box-content flex flex-row ">
      <div id="shadowBox" className="mr-auto">
        <h3 className="rainbow rainbow_text_animated lg:text-2xl font-bold m-1">
          You are watching: {CastrData?.name}
        </h3>
      </div>
      <MintButton address={address} />
    </div>
  );
};

export default BottomControlBar;
