import React, { useState, useRef, useEffect } from 'react';
import YouTube from 'react-youtube';
import MusicControl from './MusicControl';
import VolumeControl from './VolumeControl';
import MusicSelection from './MusicSelection';
import AmbientSoundControl from './AmbientSoundControl';
import BackgroundSelector from './BackgroundSelector';
import Alert from "@material-tailwind/react";
import rainSound from '../assets/sounds/rain-in-forest-birds-nature.mp3';
import windSound from '../assets/sounds/singing-birds-nature-atmo.mp3';
import fireplaceSound from '../assets/sounds/soft-rain-ambient.mp3';
import videos from '../assets/musicData';

const BottomMenu = ({ onBackgroundChange, backgrounds }) => {
    const [isMenuHidden, setIsMenuHidden] = useState(false);
    const [volume, setVolume] = useState(100);
    const [selectedVideo, setSelectedVideo] = useState(videos[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [error, setError] = useState(null);
    const playerRef = useRef(null);
    const rainAudioRef = useRef(null);
    const windAudioRef = useRef(null);
    const fireplaceAudioRef = useRef(null);
    const [ambientSounds, setAmbientSounds] = useState({
        rain: 0,
        wind: 0,
        fireplace: 0
    });
    let activityTimer;

    useEffect(() => {
        const handleUserActivity = () => {
            clearTimeout(activityTimer);
            setIsMenuHidden(false); // Show menu on activity
            activityTimer = setTimeout(() => {
                setIsMenuHidden(true); // Hide menu after 6 seconds of inactivity
            }, 6000);
        };

        window.addEventListener('mousemove', handleUserActivity);
        window.addEventListener('scroll', handleUserActivity);
        window.addEventListener('keydown', handleUserActivity);

        return () => {
            clearTimeout(activityTimer);
            window.removeEventListener('mousemove', handleUserActivity);
            window.removeEventListener('scroll', handleUserActivity);
            window.removeEventListener('keydown', handleUserActivity);
        };
    }, []);

    useEffect(() => {
        if (rainAudioRef.current) {
            rainAudioRef.current.volume = ambientSounds.rain / 100;
            ambientSounds.rain > 0 ? rainAudioRef.current.play() : rainAudioRef.current.pause();
        }
        if (windAudioRef.current) {
            windAudioRef.current.volume = ambientSounds.wind / 100;
            ambientSounds.wind > 0 ? windAudioRef.current.play() : windAudioRef.current.pause();
        }
        if (fireplaceAudioRef.current) {
            fireplaceAudioRef.current.volume = ambientSounds.fireplace / 100;
            ambientSounds.fireplace > 0 ? fireplaceAudioRef.current.play() : fireplaceAudioRef.current.pause();
        }
    }, [ambientSounds]);

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

    const handleVolumeChange = (newVolume) => {
        setVolume(newVolume);
        if (playerRef.current) {
            if (newVolume === 0) {
                playerRef.current.mute();
            } else {
                playerRef.current.unMute();
                playerRef.current.setVolume(newVolume);
            }
        }
    };

    const handleAmbientSoundChange = (type, newValue) => {
        setAmbientSounds(prev => ({
            ...prev,
            [type]: newValue
        }));
    };

    const handleVideoSelect = (video) => {
        setSelectedVideo(video);
        setIsPlaying(false);
        if (playerRef.current) {
            playerRef.current.loadVideoById(video.id);
            playerRef.current.pauseVideo();
            if (volume === 0) {
                playerRef.current.mute();
            } else {
                playerRef.current.unMute();
                playerRef.current.setVolume(volume);
            }
        }
    };

    const handleBackgroundSelect = (background) => {
        onBackgroundChange(background.src);
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

    const onPlayerError = (event) => {
        setError(event.data);
    };

    const onPlayerEnd = () => {
        const currentIndex = videos.findIndex(video => video.id === selectedVideo.id);
        const nextVideo = videos[(currentIndex + 1) % videos.length];
        handleVideoSelect(nextVideo);
    };

    const opts = {
        height: '0',
        width: '0',
        playerVars: {
            autoplay: 0,
            controls: 0,
            mute: 1,
        },
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center flex-col md:flex-row transition-all" style={{ height: 'auto' }}>
            {error && (
                <Alert color="red" onClose={() => setError(null)} className="fixed top-4 right-4 w-1/3">
                    {error}
                </Alert>
            )}

            {/* Hidden audio elements for ambient sounds */}
            <audio ref={rainAudioRef} src={rainSound} loop style={{ display: 'none' }} />
            <audio ref={windAudioRef} src={windSound} loop style={{ display: 'none' }} />
            <audio ref={fireplaceAudioRef} src={fireplaceSound} loop style={{ display: 'none' }} />

            <div className={`absolute flex items-center justify-between w-full md:w-auto md:mb-0 duration-500 ${isMenuHidden ? '-translate-y-4 md:translate-y-0' : '-translate-y-16 md:translate-y-0'} z-10`}>
                {/* Music Control */}
                <MusicControl
                    selectedVideo={selectedVideo}
                />
                {/* Volume Control */}
                <VolumeControl
                    isPlaying={isPlaying}
                    handlePlayPause={handlePlayPause}
                    volume={volume}
                    handleVolumeChange={handleVolumeChange}
                />
            </div>

            <div className={`flex items-center space-x-10 pr-4 md:pr-10 justify-center md:justify-end w-full md:w-full transition-all duration-500 md:h-[100px] ${isMenuHidden ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`} style={{ backgroundImage: `linear-gradient(to top, rgba(217, 217, 217, 0.15) 10%, rgba(115, 115, 115, 0))` }}>
                {/* Music Selection */}
                <MusicSelection
                    videos={videos}
                    handleVideoSelect={handleVideoSelect}
                />
                {/* Ambient Sound Control */}
                <AmbientSoundControl
                    ambientSounds={ambientSounds}
                    handleAmbientSoundChange={handleAmbientSoundChange}
                />
                {/* Background Selector */}
                <BackgroundSelector
                    backgrounds={backgrounds}
                    handleBackgroundSelect={handleBackgroundSelect}
                />
            </div>

            {/* YouTube Player */}
            <YouTube videoId={selectedVideo.id} opts={opts} onReady={onPlayerReady} onError={onPlayerError} onEnd={onPlayerEnd} />
        </div>
    );
};

export default BottomMenu;
