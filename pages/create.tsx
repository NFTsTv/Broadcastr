import type { NextPage } from "next";
import React, { useState } from "react";
import Container from "../components/container";
import CreateForm from "../components/CreateForm";
import { useAsset, useUpdateAsset } from "@livepeer/react";
import { useAccount } from "wagmi";
import CreateLNFT from "../components/CreateLNFT";
const Create: NextPage = () => {
  const { isConnected, address } = useAccount();


  return (
    <Container> 
      <CreateLNFT onSuccessfulCreation={() => {}} />
    </Container>
  );
};

export default Create;
