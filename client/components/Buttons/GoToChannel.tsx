import Button from "./Button";
import { useAccount } from "wagmi";
import Router from "next/router";
import { Routes } from "utils/constants";
import useCastrAccount from "hooks/useCastrAccount";
const GoToChannel = () => {
  const { castrAddress, loadingComplete } = useCastrAccount();
  console.log(castrAddress, loadingComplete); 

  const onClick = () => {
    Router.push(Routes.CAST);
  };
  if ( !castrAddress || !loadingComplete) return null;

  return <Button styles={"btn-accent"} onClick={onClick}>Go to channel</Button>;
};

export default GoToChannel;
