import React, { useEffect, useState } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useSelector } from 'react-redux';
import { selectSelectedBackground } from '@background';
import { toast } from '../../../shared/lib/toastUtils';

const VideoBackground = () => {
    // Video Background only reads the state, it doesn't manage it
    const selectedBackground = useSelector(selectSelectedBackground);
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

            const handleError = () => {
                console.error('Failed to load video:', selectedBackground.src);
                setIsNextLoaded(false);
                setNextSrc(null); // Clear the failed video
                NProgress.done();
                toast.error('Failed to load background video. Please try another background.');
                
                // Keep the current background if loading the new one failed
                if (!currentSrc) {
                    // If no current background, just clear everything
                    setCurrentSrc(null);
                }
            };

            const handleLoad = () => {
                if (videoPreloader.readyState >= 3) { // ENOUGH_DATA
                    setIsNextLoaded(true);
                    NProgress.done();
                }
            };

            videoPreloader.addEventListener('canplaythrough', handleLoad);
            videoPreloader.addEventListener('error', handleError);
            // Add timeout for slow connections
            const timeoutId = setTimeout(handleError, 15000); // 15 second timeout

            return () => {
                videoPreloader.removeEventListener('canplaythrough', handleLoad);
                videoPreloader.removeEventListener('error', handleError);
                clearTimeout(timeoutId);
                NProgress.done();
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
