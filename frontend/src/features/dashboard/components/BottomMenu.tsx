import React, { useState, useRef } from 'react';
import YouTube from 'react-youtube';
import VolumeControl from '../music/VolumeControl';
import MusicSelection from '../music/MusicSelection';
import AmbientSoundControl from '../../sounds/components/AmbientSoundControl';
import BackgroundSelector from './BackgroundSelector';
import MusicPlayer from '../music/MusicPlayer';
import { useAmbientSounds } from '../../hooks/useAmbientSounds';
import { useVideoPlayer } from '../../hooks/useVideoPlayer';
import { useLocalStorageSync } from '../../hooks/useLocalStorageSync';
import { videos } from '../../../shared/data/videos';
/*import Alert from '@material-tailwind/react';
import Loading from './Loading';
import PropTypes from 'prop-types'; // Import PropTypes
import { useSelector } from 'react-redux'; // Import useSelector*/



const BottomMenu = ({ onBackgroundChange }) => {
    const [volume, setVolume] = useState(100);
    const [isMenuHidden, setIsMenuHidden] = useState(true);
    const soundRefs = useRef<{ [key: string]: HTMLAudioElement }>({});
    const { ambientSounds, soundRefs, handleAmbientSoundChange } =
        useAmbientSounds();
    const {
        selectedVideo,
        isPlaying,
        handlePlayPause,
        handleVideoSelect,
        onPlayerReady,
        playerRef,
    } = useVideoPlayer(videos, volume);

    interface SoundRefs {
        [key: string]: HTMLAudioElement | null;
    }

    useLocalStorageSync('ambientSounds', ambientSounds);
    useLocalStorageSync('selectedVideo', selectedVideo);

    const handleVolumeChange = (newVolume) => {
        setVolume(newVolume);
        if (playerRef.current) {
            if (newVolume === 0) playerRef.current.mute();
            else playerRef.current.unMute();
            playerRef.current.setVolume(newVolume);
        }
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50">
            {/* Render components here, utilizing the custom hooks */}
            <MusicPlayer selectedVideo={selectedVideo} />
            <VolumeControl
                isPlaying={isPlaying}
                handlePlayPause={handlePlayPause}
                volume={volume}
                handleVolumeChange={handleVolumeChange}
            />
            <MusicSelection
                videos={videos}
                handleVideoSelect={handleVideoSelect}
            />
            <AmbientSoundControl
                ambientSounds={ambientSounds}
                handleAmbientSoundChange={handleAmbientSoundChange}
            />
            <BackgroundSelector handleBackgroundSelect={onBackgroundChange} />
            <YouTube videoId={selectedVideo?.id} onReady={onPlayerReady} />
        </div>
    );
};

export default BottomMenu;
