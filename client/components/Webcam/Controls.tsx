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
    <div className="absolute bottom-0">
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
        <div className="flex flex-row space-x-2 space-y-2 flex-wrap justify-center items-center">
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
          <Button styles="btn-sm" onClick={() => videoView.current?.disableVideo()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="24"
              height="24"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M12.39 8L15 10.61V8zM21 6v12c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V8c0-.55.45-1 1-1h4.5l1-1h7l1.73 1H20c.55 0 1 .45 1 1zm-2.5 9.5l-3.03-3.03L17 12.97zm-7.57-1.76l-1.55-1.55L9.9 10.5l-2.83-2.83L7.1 6.1l7.98 7.98-3.16 3.16z" />
            </svg>
            Disable Video
          </Button>
          <Button styles="btn-sm" onClick={() => videoView.current?.shareScreen()}>
            {/* Replace with an icon for sharing the screen */}
            Share Screen
          </Button>
          <Button styles="btn-sm" onClick={() => videoView.current?.switchCamera()}>
            {/* Replace with an icon for switching the camera */}
            Switch Camera
          </Button>
        </div>
      )}
    </div>
  );
};

export default Controls;
