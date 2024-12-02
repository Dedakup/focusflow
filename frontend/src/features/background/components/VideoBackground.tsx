import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@hooks';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { RootState } from '@app/store';

const VideoBackground = () => {
    // Video Background only reads the state, it doesn't manage it
    const { selectedBackground } = useAppSelector(
        (state: RootState) => state.background,
    );
    // This is why we use local state to manage the video
    const [currentSrc, setCurrentSrc] = useState<string | null>(null); // Currently displayed background
    const [nextSrc, setNextSrc] = useState<string | null>(null); // Next background being loaded
    const [isNextLoaded, setIsNextLoaded] = useState(false); // Track if next background is ready

    //And here we change the state, if the background changes
    useEffect(() => {
        if (selectedBackground?.src && selectedBackground.src !== currentSrc) {
            NProgress.start(); // Start the loading bar
            setNextSrc(selectedBackground.src); // Start loading the new video

            // Create a preload element for the new video
            const videoPreloader = document.createElement('video');
            videoPreloader.src = selectedBackground.src;
            videoPreloader.preload = 'metadata';

            videoPreloader.oncanplaythrough = () => {
                setIsNextLoaded(true); // Mark the new video as ready
                NProgress.done(); // Complete the loading bar
            };

            videoPreloader.onerror = () => {
                console.error('Failed to load video:', selectedBackground.src);
                setIsNextLoaded(false); // Handle error gracefully
                NProgress.done();
            };

            return () => {
                videoPreloader.oncanplaythrough = null;
                videoPreloader.onerror = null;
            };
        }
    }, [selectedBackground?.src, currentSrc]);

    // Transition to the new background once it's fully loaded
    useEffect(() => {
        if (isNextLoaded) {
            const transitionTimeout = setTimeout(() => {
                setCurrentSrc(nextSrc); // Update the current video
                setIsNextLoaded(false); // Reset the loading state
            }, 100); // Delay for smooth transition

            return () => clearTimeout(transitionTimeout); // Cleanup on unmount
        }
    }, [isNextLoaded, nextSrc]);

    return (
        
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0">
            {/* Currently displayed video */}
            {currentSrc && (
                <video
                    className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300"
                    autoPlay
                    loop
                    muted
                    playsInline
                    src={currentSrc}
                    style={{
                        opacity: isNextLoaded ? 0 : 1, // Fade out when new video is ready
                        transition: 'opacity 300ms ease-in-out',
                    }}
                >
                    Your browser does not support the video tag.
                </video>
            )}
            
            {/* Next video being loaded */}
            {nextSrc && isNextLoaded && (
                <video
                    className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 z-0"
                    autoPlay
                    loop
                    muted
                    playsInline
                    src={nextSrc}
                    style={{
                        opacity: 1, // Fade in once loaded
                        transition: 'opacity 300ms ease-in-out',
                    }}
                >
                    Your browser does not support the video tag.
                </video>
            )}
        </div>
    );
};

export default VideoBackground;
