import { useState } from "react";
import { Stream } from "@livepeer/react";
import Button from "components/Buttons/Button";

const SendTestSignal = ({ stream }: { stream: Stream }) => {
  const [isLoading, setIsLoading] = useState(false);
  const sendTestSignal = () => {
    setIsLoading(true);
    fetch("/api/sendTestStream", {
      method: "POST",
      body: JSON.stringify({
        streamKey: stream.streamKey,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  return (
    <Button
      onClick={() => {
        sendTestSignal();
      }}
      isLoading={isLoading}
      styles="btn-xs btn-info"
    >
      Send
    </Button>
  );
};

export default SendTestSignal;
