import useCreateCastr from "hooks/useCreateCastr";
import Button from "components/Buttons/Button";
import useCreateContext from "hooks/useCreateContext";

const CreateLNFT = () => {
  const { Castr, handleSetData } = useCreateContext();
  const { handleCreateStream, error, isLoading } = useCreateCastr();

  return (
    <>
      <p>
        Your channel on broadcastr is an NFT. When you go live, your channel can
        be viewed on platforms that support NFT display, like OpenSea, Zora,
        Zerion wallet and more.
      </p>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Whats the channel name?</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full mb-4"
          value={Castr.name}
          onChange={(e) => handleSetData("name", e.target.value)}
        />
        <label className="label">
          <span className="label-text">Whats the channel description?</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full mb-8"
          value={Castr.description}
          onChange={(e) => handleSetData("description", e.target.value)}
        />
        <Button onClick={handleCreateStream} isLoading={isLoading}>
          Next
        </Button>
        {error && <span className="text-red-500">{error}</span>}
      </div>
    </>
  );
};

export default CreateLNFT;
