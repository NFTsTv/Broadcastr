import { Castr } from "types/general";
import { formatEther, formatUnits } from "ethers/lib/utils";
import { useBalance, Address } from "wagmi";
import WithdrawalButton from "components/Buttons/WithdrawalButton";

const DetailBox = ({
  title,
  text,
  children,
}: {
  title: string;
  text: string | number;
  children?: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col space-y-2 p-4 box-border w-44">
      <div className="stat-title">{title}</div>
      <div className="text-xl font-medium">{text}</div>
      {children}
    </div>
  );
};

const StreamDetails = ({
  details,
  address,
}: {
  details: Castr;
  address: string;
}) => {
  const { data = { formatted: "", symbol: "" } } = useBalance({
    address: address as Address,
    watch: true,
  });
  return (
    <div className="flex flex-row text-white flex-wrap text-center justify-center  ">
      <DetailBox
        title="Subscribers"
        text={Number(formatUnits(details.currentSubs, 0)) - 1}
      />
      <DetailBox
        title="Subscription price"
        text={formatEther(details.price) + " MATIC"}
      />
      <DetailBox title="Earned" text={data.formatted + " " + data.symbol}>
        <WithdrawalButton address={address} />
      </DetailBox>
      <DetailBox title="Dontations" text="0"/>
    </div>
  );
};

export default StreamDetails;
