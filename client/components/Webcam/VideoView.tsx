import { useRef, forwardRef, useEffect, useImperativeHandle } from "react";

export type VideoViewHandle = {
  getMediaStream: () => MediaStream | null;
  switchCamera: () => void;
  disableVideo: () => void;
  shareScreen: () => void;
};

const VideoView = forwardRef<VideoViewHandle>((_, ref) => {
  const videoEl = useRef<HTMLVideoElement | null>(null);
  const stream = useRef<MediaStream | null>(null);

  useEffect(() => {
    const initializeStream = async () => {
      if (!videoEl.current) {
        console.log("no video element");
        return;
      }

      videoEl.current.volume = 0;

      try {
        stream.current = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: { echoCancellation: true, noiseSuppression: true },
        });

        videoEl.current.srcObject = stream.current;
        videoEl.current.play();
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    initializeStream();
  }, []);

  const shareScreen = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: { echoCancellation: true, noiseSuppression: true },
      });

      if (videoEl.current) {
        videoEl.current.srcObject = screenStream;
        stream.current = screenStream;
      }
    } catch (error) {
      console.error("Error sharing screen:", error);
    }
  };

  useImperativeHandle(ref, () => ({
    getMediaStream: () => stream.current,
    switchCamera: () => {
      const track = stream.current?.getVideoTracks()[0];

      if (track) {
        const settings = track.getSettings();
        const newFacingMode = settings.facingMode === "user" ? "environment" : "user";
        track.applyConstraints({ facingMode: newFacingMode });
      }
    },
    disableVideo: () => {
      const track = stream.current?.getVideoTracks()[0];

      if (track) {
        track.enabled = !track.enabled;
      }
    },
    shareScreen,
  }));

  return (
    <video
      ref={videoEl}
      autoPlay
      playsInline
      muted
      className="w-full h-full object-cover"
      style={{
        transform: "rotateY(180deg)",
      }}
    />
  );
});

export default VideoView;
