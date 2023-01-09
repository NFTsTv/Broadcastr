import React from "react";
import Button from "components/Buttons/Button";

const Intro = ({ onClick }: { onClick: () => void }) => {
  return (
    <>
      <h1>Welcome to NFTsTv!</h1>
      <p>
        NFTsTv is an open, permisionless livestreaming platform that allows
        content creators to easily monetize their content thanks to the LiveNFT
        technology.
      </p>
      <p>Lets get started by creating your NFTsTv channel.</p>
      <Button onClick={onClick}>Create Channel</Button>
    </>
  );
};

export default Intro;
