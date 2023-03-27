import React, { useRef, useEffect, useState } from 'react';
import Hls from 'hls.js';

const HLSFirstFrame: React.FC<{ url: string }> = ({ url }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      const hls = new Hls();

      hls.loadSource(url);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, async () => {
        await video.play();

        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
        context && context.drawImage(video, 0, 0);
        const image = canvas.toDataURL('image/jpeg');
        setImage(image);

        hls.destroy();
      });
    }
  }, [url]);

  return (
    <>
      {image && (
        <img src={image} alt="First frame" style={{ objectFit: 'contain' }} />
      )}
      <video ref={videoRef} style={{ display: 'none' }}></video>
    </>
  );
};

export default HLSFirstFrame;
