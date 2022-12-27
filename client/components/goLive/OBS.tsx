import React from "react";

const OBS = ({ streamKey }: { streamKey: string }) => (
  <>
    <p>
      You can use obs, or any other livestreaming software to go live. Check out
      the{" "}
      <a href="https://docs.livepeer.org/guides/developing/stream-via-obs">
        livepeer documentation
      </a>{" "}
      on how to use OBS to start livestreaming
    </p>
    <h2>Stream details</h2>
    <div className="form-control">
      <label className="label">
        <span className="label-text">Ingest url</span>
      </label>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-full"
        value="rtmp://rtmp.livepeer.com/live"
        onClick={(e) => {}}
      />
      <label className="label">
        <span className="label-text">Streamkey</span>
      </label>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-full"
        value={streamKey}
        onClick={(e) => {
          console.log(streamKey);
        }}
      />
    </div>
  </>
);

export default OBS;
