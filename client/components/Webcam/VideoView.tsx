import { useRef, forwardRef, useEffect, useImperativeHandle } from "react";

export type VideoViewHanlde = {
  getMediaStream: () => MediaStream | null;
  switchCamera: () => void;
  disableVideo: () => void;
};

const VideoView = forwardRef<VideoViewHanlde>((props, ref) => {
  const videoEl = useRef<HTMLVideoElement | null>(null);
  const stream = useRef<MediaStream | null>(null);
  useEffect(() => {
    (async () => {
      if (!videoEl.current) {
        console.log("no video element");
        return;
      }
      if (!stream.current) {
        videoEl.current.volume = 0;
        stream.current = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: { echoCancellation: true, noiseSuppression: true },
        });
      }
      videoEl.current.srcObject = stream.current;
      videoEl.current.play();
    })();
  }, [stream]);

  // Expose the methods to the parent component using useImperativeHandle
  useImperativeHandle(ref, () => ({
    getMediaStream: () => {
      return stream.current;
    },
    switchCamera: () => {
      if (!stream.current) {
        return;
      }

      const track = stream.current.getVideoTracks()[0];
      if (!track) {
        return;
      }

      const settings = track.getSettings();
      if (!settings) {
        return;
      }

      track.applyConstraints({
        facingMode: settings.facingMode === "user" ? "environment" : "user",
      });
    },
    disableVideo: () => {
      if (!stream.current) {
        return;
      }

      const track = stream.current.getVideoTracks()[0];
      if (!track) {
        return;
      }

      track.enabled = !track.enabled;
    },
  }));

  return (
    <video
      ref={videoEl}
      autoPlay
      playsInline
      muted
      style={{
        transform: "rotateY(180deg)",
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
  );
});

export default VideoView;
