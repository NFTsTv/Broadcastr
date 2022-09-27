import type { NextPage } from "next";
import React from "react";
import Container from "../components/container";
import { useAccount } from "wagmi";
import { getNFTs } from "../services/collections";
import { lnft } from "../types/general";

const List: NextPage = () => {
  const [data, setData] = React.useState<lnft[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { address } = useAccount();

  React.useEffect(() => {
    if (address) {
      getNFTs(address).then((res) => {
        console.log([...data]);
        setData(res);
        setIsLoading(false);
      });
    }
  }, []);

  return (
    <Container>
      <h1 className="text-4xl font-bold">NFTS are live</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {data.map((nft) => (
            <div className="card w-96 bg-base-100 shadow-xl">
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
