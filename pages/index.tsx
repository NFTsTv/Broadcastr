import type { NextPage } from "next";
import Link from "next/link";
import React from "react";
import Container from "../components/container";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Home: NextPage = () => {
  return (
    <Container>
      <ConnectButton />
      <h1 className="text-4xl font-bold">NFTS are live</h1>
      <Link href="/create">
        <button className="btn btn-wide btn-primary">Create LNFT</button>
      </Link>
      <Link href="/list">
        <button className="btn btn-wide btn-secondary">View collection</button>
      </Link>
      <button className="btn btn-wide btn-accent">Explore</button>
    </Container>
  );
};

export default Home;
