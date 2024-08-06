import React from 'react';

const VideoBackground = ({ backgroundSrc }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-[-1]">
            <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                src={backgroundSrc}
            >
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default VideoBackground;
