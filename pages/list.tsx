import type { NextPage } from "next";
import React from "react";
import Container from "../components/container";
import { useAccount } from "wagmi";
import { get } from "../utils/requests";
import axios from "axios";
const List: NextPage = () => {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { address } = useAccount();

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await get("/api/collection/" + address);
      console.log(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return <Container><></></Container>;
};

export default List;
