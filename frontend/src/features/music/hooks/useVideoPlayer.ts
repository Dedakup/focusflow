import { useState, useRef } from 'react';

export const useVideoPlayer = (videos, volume) => {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const playerRef = useRef(null);

    const handlePlayPause = () => {
        if (isPlaying) {
            playerRef.current.pauseVideo();
        } else {
            playerRef.current.playVideo();
            if (volume === 0) {
                playerRef.current.mute();
            } else {
                playerRef.current.unMute();
                playerRef.current.setVolume(volume);
            }
        }
        setIsPlaying(!isPlaying);
    };

    const handleVideoSelect = (video) => {
        setSelectedVideo(video);
        setIsPlaying(false);
        if (playerRef.current) {
            playerRef.current.loadVideoById(video.id);
            playerRef.current.pauseVideo();
        }
    };

    const onPlayerReady = (event) => {
        playerRef.current = event.target;
        if (volume === 0) {
            playerRef.current.mute();
        } else {
            playerRef.current.unMute();
            playerRef.current.setVolume(volume);
        }
    };

    return {
        selectedVideo,
        isPlaying,
        handlePlayPause,
        handleVideoSelect,
        onPlayerReady,
        playerRef,
    };
};
