import { Castr } from "types/general";
import { formatEther } from "ethers/lib/utils";
import { useBalance } from "wagmi";
import WithdrawalButton from "components/Buttons/WithdrawalButton";

const DetailBox = ({
  title,
  text,
  children,
}: {
  title: string;
  text: string | string;
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
    addressOrName: address,
    watch: true,
  });
  return (
    <div className="flex flex-col w-full rounded-xl">
      <div className="flex flex-col space-y-4 text-center">
        <div className="flex flex-row lg:flex-col xl:flex-row w-full max-w-full text-white justify-center">
          <DetailBox
            title="Subscription price"
            text={formatEther(details.price) + " MATIC"}
          />
          <DetailBox title="Earned" text={data.formatted + " " + data.symbol}>
            <WithdrawalButton address={address} />
          </DetailBox>
        </div>
      </div>
    </div>
  );
};

export default StreamDetails;
