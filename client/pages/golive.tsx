import type { NextPage } from "next";
import React from "react";
import Container from "components/container";
import Menu from "components/Menu";
import { useRouter } from "next/router";
import { useLivenft } from "hooks/useLiveNFT";
import Modal from "components/Modal";
import Link from "next/link";

const Create: NextPage = () => {
  const router = useRouter();
  const { address } = router.query;
  const { stream } = useLivenft(address as string);
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Container>
      {isOpen && (
        <Modal
          onExit={() => {
            setIsOpen(false);
          }}
        >
          <div className="flex flex-col m-auto">
            <h1 className="mb-2">Warning!</h1>
            <p>
              You can use your webcam to stream directly into the Live NFT, but
              this feature is still in development and might not work at all.
              For the best experience posible, we recomend using chrome.
            </p>
            <Link href={`/stream?address=${address}`}>
              <button className="btn btn-sm mt-4 text-white">Take me to the webcam</button>
            </Link>
            <button onClick={() => setIsOpen(false)} className="btn btn-sm btn-warning mt-4 text-white">Dont do it</button>

          </div>
        </Modal>
      )}
      <Menu />
      <h1>Go live on your LNFT!</h1>
      <p>
        You can use obs, or any other livestreaming software to go live. Check
        out the{" "}
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
          value={stream?.rtmpIngestUrl}
          onClick={(e) => {
            console.log(stream);
          }}
        />
        <label className="label">
          <span className="label-text">Streamkey</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full"
          value={stream?.streamKey}
          onClick={(e) => {
            console.log(stream);
          }}
        />
      </div>
      <div
        onClick={() => {
          setIsOpen(true);
        }}
        className="btn"
      >
        Use webcam
      </div>
    </Container>
  );
};

export default Create;
