import Link from "next/link";

const Webcam = ({ address }: { address: string }) => (
  <>
    <h1 className="mb-2">Warning!</h1>
    <p>
      You can use your webcam to stream directly into the Live NFT, but this
      feature is still in development and might not work at all. For the best
      experience posible, we recomend using chrome.
    </p>
    <Link href={`/stream?address=${address}`}>
      <button className="btn btn-sm mt-4 text-white">
        Take me to the webcam
      </button>
    </Link>
  </>
);

export default Webcam;
