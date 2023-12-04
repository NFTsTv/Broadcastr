import Button from "./Button";
import { useAccount } from "wagmi";
import Router from "next/router";
import { Routes } from "utils/constants";
import useCastrAccount from "hooks/useCastrAccount";
const GoToChannel = () => {
  const { castrAddress, loadingComplete } = useCastrAccount();

  const onClick = () => {
    if (!castrAddress) {
      Router.push(Routes.CREATE);
    } else {
      Router.push(Routes.CAST);
    }
  };

  return (
    <Button styles={"btn-accent btn-sm"} onClick={onClick}>
      Go to channel
    </Button>
  );
};

export default GoToChannel;
