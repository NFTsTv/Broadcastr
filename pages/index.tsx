import type { NextPage } from "next";
import React from "react";
import Container from "../components/container";


const Home: NextPage = () => {
  return (
    <Container>
      <h1 className="text-4xl font-bold">NFTS are live</h1>
      <button className="btn btn-wide btn-primary">Create LNFT</button>
      <button className="btn btn-wide btn-secondary">View collection</button>
      <button className="btn btn-wide btn-accent">Explore</button>
    </Container>
  );
};

export default Home;
