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
    <div className="flex flex-col mx-auto space-y-2">
      <div className="stat-title">{title}</div>
      <div className="text-2xl font-medium">{text}</div>
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
    <div className="flex flex-col w-full rounded-xl">
      <div className="flex flex-col space-y-4 text-center">
        <div className="flex flex-col lg:flex-row xl:flex-row text-white">
          <div className="flex flex-col space-y-4 lg:w-full xl:h-1/2">
            <DetailBox title="Subscribers" text={Number(formatUnits(details.currentSubs, 0)) - 1} />
            <DetailBox title="Earned" text={data.formatted + " " + data.symbol}>
              <WithdrawalButton address={address} />
            </DetailBox>
          </div>
          <div className="flex flex-col space-y-4 lg:w-full xl:h-1/2">
            <DetailBox
              title="Subscription price"
              text={formatEther(details.price) + " MATIC"}
            />
          </div>
        </div>
      </div>
    </div>

  );
};

export default StreamDetails;
