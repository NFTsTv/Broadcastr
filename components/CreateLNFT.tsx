import React, { useEffect } from "react";
import { createMetadata } from "../utils/helpers";
import {
  useAsset,
  useUpdateAsset,
  useCreateStream,
  Stream,
} from "@livepeer/react";
import { post } from "../utils/requests";

interface Props {
  onSuccessfulCreation: (baseUri: string) => void;
}

const CreateLNFT = ({ ...props }: Props) => {
  const [data, setData] = React.useState({
    name: "",
    description: "",
  });

  const {
    data: assetData,
    mutate: createStream,
    status: createStreamStatus,
    error,
  } = useCreateStream({ name: data.name });

  useEffect(() => {
    if (createStreamStatus === "success") {
      const metadata = createMetadata({
        name: data.name,
        description: data.description,
        playbackId: assetData?.playbackId || "",
      });
      post("/api/collection/uploadMetadata", metadata).then((res) => {
        props.onSuccessfulCreation(res?.url);
      });
    }
  }, [createStreamStatus]);

  const handleSubmit = () => {
    if (data.name !== "" && data.description !== "") {
      createStream && createStream();
    }
  };

  return (
    <div className="flex flex-col">
      <span className="text-4xl bold mb-4">Create your Live NFT!</span>
      <div className="form-control w-full max-w-xs m-auto">
        <label className="label">
          <span className="label-text">Whats the channel name?</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full mb-4"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <label className="label">
          <span className="label-text">Whats the channel description?</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full mb-8"
          onChange={(e) => setData({ ...data, description: e.target.value })}
        />
        <button onClick={handleSubmit} className="btn btn-primary">
          Next step
        </button>
        {error && <span className="text-red-500">{error.message}</span>}
      </div>
    </div>
  );
};

export default CreateLNFT;
