import React, { useState, useEffect, useRef } from "react";

const OfflineView: React.FC = () => {
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const containerHeight = Math.round((containerWidth * 9) / 16);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-black text-gray-500 flex items-center justify-center  font-bold tracking-wider"
      style={{
        height: `${containerHeight}px`,
        fontSize: `${containerWidth / 20}px`,
      }}
    >
      Stream is offline
    </div>
  );
};

export default OfflineView;
