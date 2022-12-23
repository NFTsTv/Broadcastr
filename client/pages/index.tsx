import type { NextPage } from "next";
import Link from "next/link";
import React from "react";
import Container from "../components/container";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Home: NextPage = () => {
  return (
    <Container>
      <span className="mx-auto text-2xl">Welcome</span>
      <div className="mx-auto">
        <ConnectButton />
      </div>
      <Link href="/create">
        <button className="btn btn-primary w-full">Create LNFT</button>
      </Link>
      <Link href="/list">
        <button className="btn w-full btn-secondary">View collection</button>
      </Link>
    </Container>
  );
};

export default Home;
