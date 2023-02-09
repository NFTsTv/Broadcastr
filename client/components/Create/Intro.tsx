import Button from "components/Buttons/Button";

const Intro = ({ onClick }: { onClick: () => void }) => {
  return (
    <>
      <h1>Welcome to broadcastr!</h1>
      <p>
        broadcastr is an open, permisionless livestreaming protocol that allows
        content creators to easily monetize their content thanks to the Castr
        technology.
      </p>
      <p>Lets get started by creating your broadcastr channel.</p>
      <Button onClick={onClick}>Create Channel</Button>
    </>
  );
};

export default Intro;
