import React, { useState, useRef, useEffect, useCallback, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Button, Popover, PopoverHandler, PopoverContent } from "@material-tailwind/react";

// Dynamically import other components
const BackgroundSelector = dynamic(() => import('./BackgroundSelector'), { ssr: false });
const YouTube = dynamic(() => import('react-youtube'), { ssr: false });
const MusicControl = dynamic(() => import('./MusicControl'), { ssr: false });
const VolumeControl = dynamic(() => import('./VolumeControl'), { ssr: false });

// Lazy load popover content components
const MusicSelection = React.lazy(() => import('./MusicSelection'));
const AmbientSoundControl = React.lazy(() => import('./AmbientSoundControl'));

const BottomMenu = ({ onBackgroundChange }) => {
    const [isMenuHidden, setIsMenuHidden] = useState(false);
    const [volume, setVolume] = useState(100);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [videos, setVideos] = useState([]);
    const [backgrounds, setBackgrounds] = useState([]);
    const [ambientSounds, setAmbientSounds] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [error, setError] = useState(null);
    const [isMusicSelectionOpen, setIsMusicSelectionOpen] = useState(false);
    const [isAmbientSoundControlOpen, setIsAmbientSoundControlOpen] = useState(false);
    const playerRef = useRef(null);
    const soundRefs = useRef({});

    useEffect(() => {
        // Fetch videos, backgrounds, and sounds data from the server
        const fetchData = async () => {
            try {
                const [videosRes, backgroundsRes, soundsRes] = await Promise.all([
                    fetch('http://localhost:5000/api/videos').then(res => res.json()),
                    fetch('http://localhost:5000/api/backgrounds').then(res => res.json()),
                    fetch('http://localhost:5000/api/sounds').then(res => res.json())
                ]);

                setVideos(videosRes);
                setBackgrounds(backgroundsRes);
                setAmbientSounds(soundsRes.map(sound => ({ ...sound, volume: 0 })));
                setSelectedVideo(videosRes[0]);
            } catch (error) {
                console.error('Failed to fetch data', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const handleUserActivity = () => {
            setIsMenuHidden(false);
            clearTimeout(handleUserActivity.timer);
            handleUserActivity.timer = setTimeout(() => setIsMenuHidden(true), 6000);
        };

        const events = ['mousemove', 'scroll', 'keydown'];
        events.forEach(event => window.addEventListener(event, handleUserActivity));

        return () => {
            clearTimeout(handleUserActivity.timer);
            events.forEach(event => window.removeEventListener(event, handleUserActivity));
        };
    }, []);

    useEffect(() => {
        ambientSounds.forEach(sound => {
            const soundRef = soundRefs.current[sound.id];
            if (soundRef) {
                soundRef.volume = sound.volume / 100;
                if (sound.volume > 0) {
                    soundRef.play();
                } else {
                    soundRef.pause();
                }
            }
        });
    }, [ambientSounds]);

    useEffect(() => {
        const storedBackground = window.localStorage.getItem('selectedBackground');
        const storedVideo = JSON.parse(window.localStorage.getItem('selectedVideo'));
        const storedAmbientSounds = JSON.parse(window.localStorage.getItem('ambientSounds'));

        if (storedBackground) {
            onBackgroundChange(storedBackground);
        }

        if (storedVideo) {
            setSelectedVideo(storedVideo);
        }

        if (storedAmbientSounds) {
            setAmbientSounds(storedAmbientSounds);
        }
    }, [onBackgroundChange]);

    useEffect(() => {
        if (selectedVideo) {
            window.localStorage.setItem('selectedVideo', JSON.stringify(selectedVideo));
        }
        window.localStorage.setItem('ambientSounds', JSON.stringify(ambientSounds));
    }, [selectedVideo, ambientSounds]);

    const handlePlayPause = useCallback(() => {
        if (isPlaying) {
            playerRef.current.pauseVideo();
        } else {
            playerRef.current.playVideo();
            playerRef.current.setVolume(volume);
            if (volume === 0) {
                playerRef.current.mute();
            } else {
                playerRef.current.unMute();
            }
        }
        setIsPlaying(!isPlaying);
    }, [isPlaying, volume]);

    const handleVolumeChange = useCallback((newVolume) => {
        setVolume(newVolume);
        if (playerRef.current) {
            playerRef.current.setVolume(newVolume);
            if (newVolume === 0) {
                playerRef.current.mute();
            } else {
                playerRef.current.unMute();
            }
        }
    }, []);

    const handleAmbientSoundChange = useCallback((id, newValue) => {
        setAmbientSounds(prev =>
            prev.map(sound =>
                sound.id === id ? { ...sound, volume: newValue } : sound
            )
        );
    }, []);

    const handleVideoSelect = useCallback((video) => {
        setSelectedVideo(video);
        setIsPlaying(false);
        if (playerRef.current) {
            playerRef.current.loadVideoById(video.id);
            playerRef.current.pauseVideo();
            playerRef.current.setVolume(volume);
            if (volume === 0) {
                playerRef.current.mute();
            } else {
                playerRef.current.unMute();
            }
        }
    }, [volume]);

    const handleBackgroundSelect = useCallback((background) => {
        onBackgroundChange(background.src);
        window.localStorage.setItem('selectedBackground', background.src);
    }, [onBackgroundChange]);

    const onPlayerReady = useCallback((event) => {
        playerRef.current = event.target;
        playerRef.current.setVolume(volume);
        if (volume === 0) {
            playerRef.current.mute();
        } else {
            playerRef.current.unMute();
        }
    }, [volume]);

    const onPlayerError = useCallback((event) => {
        setError(event.data);
    }, []);

    const onPlayerEnd = useCallback(() => {
        const currentIndex = videos.findIndex(video => video.id === selectedVideo?.id);
        const nextVideo = videos[(currentIndex + 1) % videos.length];
        handleVideoSelect(nextVideo);
    }, [selectedVideo, handleVideoSelect]);

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
            {ambientSounds.map(sound => (
                <audio key={sound.id} ref={el => soundRefs.current[sound.id] = el} src={sound.src} loop style={{ display: 'none' }} />
            ))}

            <div className={`absolute flex items-center justify-between w-full md:w-auto md:mb-0 duration-500 ${isMenuHidden ? '-translate-y-4 md:translate-y-0' : '-translate-y-16 md:translate-y-0'} z-10`}>
                {selectedVideo && <MusicControl selectedVideo={selectedVideo} />}
                <VolumeControl isPlaying={isPlaying} handlePlayPause={handlePlayPause} volume={volume} handleVolumeChange={handleVolumeChange} />
            </div>

            <div className={`flex items-center space-x-10 pr-4 md:pr-10 justify-center md:justify-end w-full md:w-full transition-all duration-500 md:h-[100px] ${isMenuHidden ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`} style={{ backgroundImage: `linear-gradient(to top, rgba(217, 217, 217, 0.15) 10%, rgba(115, 115, 115, 0))` }}>
                <Popover placement="top" offset={10} onOpen={() => setIsMusicSelectionOpen(true)} onClose={() => setIsMusicSelectionOpen(false)}>
                    <PopoverHandler>
                        <Button variant='text' className="w-20 h-20 flex flex-col rounded-2xl text-white items-center group">
                            <span className='text-white text-sm mt-2'>Music</span>
                        </Button>
                    </PopoverHandler>
                    <PopoverContent className="w-72 p-4 bg-gray-700 text-white z-50 h-96 overflow-y-auto">
                        <Suspense fallback={<div>Loading...</div>}>
                            {isMusicSelectionOpen && (
                                <MusicSelection videos={videos} handleVideoSelect={handleVideoSelect} />
                            )}
                        </Suspense>
                    </PopoverContent>
                </Popover>

                <Popover placement="top" offset={10} onOpen={() => setIsAmbientSoundControlOpen(true)} onClose={() => setIsAmbientSoundControlOpen(false)}>
                    <PopoverHandler>
                        <Button variant='text' className="w-20 h-20 flex flex-col rounded-2xl text-white items-center group">
                            <span className='text-white text-sm mt-2'>Sounds</span>
                        </Button>
                    </PopoverHandler>
                    <PopoverContent className="w-72 p-4 bg-gray-700 text-white z-50 h-96 overflow-y-auto">
                        <Suspense fallback={<div>Loading...</div>}>
                            {isAmbientSoundControlOpen && (
                                <AmbientSoundControl ambientSounds={ambientSounds} handleAmbientSoundChange={handleAmbientSoundChange} />
                            )}
                        </Suspense>
                    </PopoverContent>
                </Popover>

                <BackgroundSelector backgrounds={backgrounds} handleBackgroundSelect={handleBackgroundSelect} />
            </div>

            {selectedVideo && <YouTube videoId={selectedVideo.id} opts={opts} onReady={onPlayerReady} onError={onPlayerError} onEnd={onPlayerEnd} />}
        </div>
    );
};

export default BottomMenu;
