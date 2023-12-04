import React from "react";
import Button from "components/Buttons/Button";
import { VideoViewHandle } from "./VideoView";

interface ControlsProps {
  videoView: React.RefObject<VideoViewHandle>;
  startStream: () => void;
  state: string;
}

const Controls: React.FC<ControlsProps> = ({
  videoView,
  startStream,
  state,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="absolute bottom-2 left-0 right-0 flex flex-col justify-center items-center">
      <Button onClick={() => setIsOpen(!isOpen)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="24"
          height="24"
        >
          <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
        </svg>
        {isOpen ? "Close Controls" : "Open Controls"}
      </Button>

      {isOpen && (
        <div className="flex flex-row justify-center items-center space-x-2 mt-2 mb-4">
          <Button styles="btn-sm" onClick={startStream}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="24"
              height="24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
            {state === "playing" ? "Streaming" : "Start Stream"}
          </Button>
          <Button
            styles="btn-sm"
            onClick={() => videoView.current?.disableVideo()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="24"
              height="24"
            >
              <path d="M4 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6z" />
            </svg>
            Disable Video
          </Button>
          <Button
            styles="btn-sm"
            onClick={() => videoView.current?.shareScreen()}
          >
            {/* Replace with an icon for sharing the screen */}
            Share Screen
          </Button>
          <Button
            styles="btn-sm"
            onClick={() => videoView.current?.switchCamera()}
          >
            {/* Replace with an icon for switching the camera */}
            Switch Camera
          </Button>
        </div>
      )}
    </div>
  );
};

export default Controls;
