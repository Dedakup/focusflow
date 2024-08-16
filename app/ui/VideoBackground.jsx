// app/ui/VideoBackground.jsx
import dynamic from "next/dynamic";
import React from "react";

const VideoBackground = ({ backgroundSrc }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src={backgroundSrc} type="video/mp4" />
        <p>Your browser does not support the video tag.</p>
      </video>
    </div>
  );
};

export default dynamic(() => Promise.resolve(VideoBackground), { ssr: false });
