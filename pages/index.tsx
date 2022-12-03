import type { NextPage } from "next";
import Link from "next/link";
import React from "react";
import Container from "../components/container";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Home: NextPage = () => {
  return (
    <Container>
      <span className="text-4xl bold mb-4">NFTS are live!</span>

      <div className=" m-auto">
        <ConnectButton />
      </div>
      <Link href="/create">
        <button className="btn btn-primary w-full">Create LNFT</button>
      </Link>
      <Link href="/list">
        <button className="btn w-full btn-secondary">View collection</button>
      </Link>
      <Link href="/stream">
        <button className="btn w-full btn-accent">Live stream</button>
      </Link>
    </Container>
  );
};

export default Home;
