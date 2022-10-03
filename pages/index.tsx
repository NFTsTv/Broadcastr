import type { NextPage } from "next";
import Link from "next/link";
import React from "react";
import Container from "../components/container";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { useAccount } from "wagmi";

const Home: NextPage = () => {
  const { isConnected, address } = useAccount();
  return (
    <Container>
      <div className="mb-4">
        <h1 className="text-4xl font-bold mb-2">NFTS are live</h1>
        <ConnectButton />
      </div>
      <Link href="/create">
        <button className="btn btn-wide btn-primary" disabled>
          Create LNFT
        </button>
      </Link>
      <Link href="/list">
        <button className="btn btn-wide btn-secondary" disabled>
          View collection
        </button>
      </Link>
      <Link href="/stream">
        <button className="btn btn-wide btn-accent">Live stream</button>
      </Link>
    </Container>
  );
};

export default Home;
