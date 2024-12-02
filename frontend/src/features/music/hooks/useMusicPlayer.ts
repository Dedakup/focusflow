import { useState, useRef } from 'react';

export const useMusicPlayer = (musicSources, volume) => {
    const [selectedMusicSource, setSelectedMusicSource] = useState(null);
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

    const handleMusicSourceSelect = (musicSource) => {
        setSelectedMusicSource(musicSource);
        setIsPlaying(false);
        if (playerRef.current) {
            playerRef.current.loadVideoById(musicSource.id);
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
        selectedMusicSource,
        isPlaying,
        handlePlayPause,
        handleMusicSourceSelect,
        onPlayerReady,
        playerRef,
    };
};
