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
            <Link href="/create">
                <button className="btn btn-wide btn-primary">Create LNFT</button>
            </Link>
        </Container>
    );
};

export default Create;