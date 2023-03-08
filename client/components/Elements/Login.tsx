import Container from "./Container";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";

const Login = () => {
  return (
    <Container>
      <div className="flex flex-col items-center space-y-4">
        <div className="w-screen h-48 realtive">
          <Image
            src="/logo.png"
            alt="Broadcastr Logo"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <h1 className="text-2xl text-center">Welcome to Broadcastr!</h1>
        <p className="text-center">Connect your wallet to get started.</p>
        <ConnectButton />
      </div>
    </Container>
  );
};

export default Login;