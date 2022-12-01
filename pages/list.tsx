import type { NextPage } from "next";
import React from "react";
import Container from "../components/container";
import { useAccount } from "wagmi";

const List: NextPage = () => {
  const [data, setData] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { address } = useAccount();

  // React.useEffect(() => {
  //   if (address) {
  //     getNFTs(address).then((res) => {
  //       console.log([...data]);
  //       setData(res);
  //       setIsLoading(false);
  //     });
  //   }
  // }, []);

  return (
    <Container>
      <h1 className="text-4xl font-bold">NFTS are live</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col overflow-y">
          {data.map((nft) => (
            <div className="card w-96 bg-base-90 shadow-xl">
              <div className="card-body">
                <h2 className="text-2xl font-bold">{nft.metadata.name}</h2>
                <p className="text-xl">{nft.metadata.description}</p>
              </div>
              <figure>
                <iframe src={nft.metadata.animation_url} />
              </figure>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};

export default List;
