import type { NextPage } from "next";
import Link from "next/link";
import React, { useState } from "react";
import Container from "../components/container";
import CreateForm from "../components/CreateForm";

import {
    useAccount,
} from "wagmi";




const Create: NextPage = () => {
    const { isConnected, address } = useAccount();

    return (
        <Container>
            <CreateForm/>
        </Container>
    );
};

export default Create;