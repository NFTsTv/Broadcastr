import useCreateCastr from "hooks/useCreateCastr";
import Button from "components/Buttons/Button";
import useCreateContext from "hooks/useCreateContext";

const DeployLNFT = () => {
  const { Castr, handleSetData, formError } = useCreateContext();

  const { deployContract, error, isLoading } = useCreateCastr();

  return (
    <>
      <p>
        Subscribers to your channel will be able to watch your stream on these
        platforms. Additionally, these subscribers can also trade their
        subscription to your channel on the secondary market.
      </p>
      <div className="form-control w-full max-w-xs m-auto">
        <label className="label">
          <span className="label-text">Subscription price</span>
        </label>
        <label className="input-group mb-4 max-w-xs w-full">
          <input
            type="text"
            placeholder="10"
            value={Castr.price}
            className="input input-bordered w-3/4"
            onChange={(e) => handleSetData("price", e.target.value)}
          />
          <span className="w-1/4">MATIC</span>
        </label>

        <label className="label">
          <span>Want a limited number of subscribers?</span>
          <input type={"checkbox"} checked={Castr.limitedSupply} className="toggle toggle-success" onChange={(e) => handleSetData("limitedSupply", e.target.checked)} />
        </label>

        {Castr.limitedSupply && (
          <>
            <label className="label">
              <span className="label-text">Max. number of subscriptions</span>
            </label>
            <input
              type="text"
              placeholder="100"
              className="input input-bordered w-full mb-4"
              value={Castr.totalSupply}
              onChange={(e) => handleSetData("totalSupply", e.target.value)}
            />
          </>
        )}

        <Button disabled={!deployContract} onClick={() => deployContract?.()} isLoading={isLoading}>
          Deploy
        </Button>
        {formError && <div>An error occurred: {formError}</div>}
        {error && <div>{error}</div>}
      </div>
    </>
  );
};

export default DeployLNFT;
