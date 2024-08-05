import React, { useState, useRef, useEffect } from 'react';
import YouTube from 'react-youtube';
import {
    Button,
    IconButton,
    Popover,
    PopoverHandler,
    PopoverContent,
    Slider,
    Alert,
} from "@material-tailwind/react";
import {
    PlayIcon as PlayIconSolid,
    PauseIcon as PauseIconSolid,
    MusicalNoteIcon as MusicalNoteIconSolid,
    EyeIcon as EyeIconSolid,
    SpeakerWaveIcon as SpeakerWaveIconSolid,
    SpeakerXMarkIcon as SpeakerXMarkIconSolid,
    SignalIcon as SignalIconSolid,
} from '@heroicons/react/24/solid';

import {
    PlayIcon as PlayIconOutline,
    PauseIcon as PauseIconOutline,
    MusicalNoteIcon as MusicalNoteIconOutline,
    EyeIcon as EyeIconOutline,
    SpeakerWaveIcon as SpeakerWaveIconOutline,
    SpeakerXMarkIcon as SpeakerXMarkIconOutline,
    SignalIcon as SignalIconOutline,
} from '@heroicons/react/24/outline';

// Import MP3 files
import rainSound from '../assets/sounds/rain-in-forest-birds-nature.mp3';
import windSound from '../assets/sounds/singing-birds-nature-atmo.mp3';
import fireplaceSound from '../assets/sounds/soft-rain-ambient.mp3';

import videos from '../assets/musicData';

const BottomMenu = () => {
    const [isMenuHidden, setIsMenuHidden] = useState(false);
    const [volume, setVolume] = useState(100);
    const [selectedVideo, setSelectedVideo] = useState(videos[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [error, setError] = useState(null);
    const playerRef = useRef(null);
    const rainAudioRef = useRef(new Audio(rainSound));
    const windAudioRef = useRef(new Audio(windSound));
    const fireplaceAudioRef = useRef(new Audio(fireplaceSound));
    const [ambientSounds, setAmbientSounds] = useState({
        rain: 0,
        wind: 0,
        fireplace: 0,
    });

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (!document.hidden && playerRef.current && isPlaying) {
                playerRef.current.playVideo();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [isPlaying]);

    useEffect(() => {
        // Adjust volume based on ambientSounds state
        if (rainAudioRef.current) {
            rainAudioRef.current.volume = ambientSounds.rain / 100;
            if (ambientSounds.rain > 0) {
                rainAudioRef.current.play();
            } else {
                rainAudioRef.current.pause();
            }
        }
        if (windAudioRef.current) {
            windAudioRef.current.volume = ambientSounds.wind / 100;
            if (ambientSounds.wind > 0) {
                windAudioRef.current.play();
            } else {
                windAudioRef.current.pause();
            }
        }
        if (fireplaceAudioRef.current) {
            fireplaceAudioRef.current.volume = ambientSounds.fireplace / 100;
            if (ambientSounds.fireplace > 0) {
                fireplaceAudioRef.current.play();
            } else {
                fireplaceAudioRef.current.pause();
            }
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
        const intValue = parseInt(newValue, 10);
        setAmbientSounds(prev => ({
            ...prev,
            [type]: intValue
        }));
        // Adjust the volume of the corresponding ambient sound and play/pause based on the value
        if (type === 'rain' && rainAudioRef.current) {
            rainAudioRef.current.volume = intValue / 100;
            if (intValue > 0) {
                rainAudioRef.current.play();
            } else {
                rainAudioRef.current.pause();
            }
        } else if (type === 'wind' && windAudioRef.current) {
            windAudioRef.current.volume = intValue / 100;
            if (intValue > 0) {
                windAudioRef.current.play();
            } else {
                windAudioRef.current.pause();
            }
        } else if (type === 'fireplace' && fireplaceAudioRef.current) {
            fireplaceAudioRef.current.volume = intValue / 100;
            if (intValue > 0) {
                fireplaceAudioRef.current.play();
            } else {
                fireplaceAudioRef.current.pause();
            }
        }
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

            {/* Music */}
            <div
                className={`absolute flex items-center justify-between w-full md:w-auto md:mb-0 duration-500 ${isMenuHidden ? '-translate-y-4 md:translate-y-0' : 'translate-y-0 md:translate-y-0'} z-10`}
            >
                <div className="flex items-center pl-4 pb-4 md:pl-10 md:pb-0">
                    {selectedVideo && (
                        <div className="flex items-center text-left ml-4">
                            <a href={`https://www.youtube.com/watch?v=${selectedVideo.id}`} target="_blank" rel="noopener noreferrer">
                                <img src={selectedVideo.thumbnail} alt={selectedVideo.title} className="w-16 h-16 md:w-20 md:h-20 bg-gray-200 rounded-md" />
                            </a>
                            <a href={`https://www.youtube.com/watch?v=${selectedVideo.id}`} target="_blank" rel="noopener noreferrer" className="text-white ml-4 hover:underline">
                                {selectedVideo.title}
                            </a>
                        </div>
                    )}
                </div>
                <div
                    className={`flex items-center pr-4 pb-4 md:pr-0 md:pb-0  md:ml-40 space-x-10 duration-500 ${isMenuHidden ? 'translate-y-0 md:translate-y-[300%]' : 'translate-y-0'} z-10`}
                >
                    <IconButton variant="text" className="rounded-full w-24 h-24 group" onClick={handlePlayPause}>
                        {isPlaying ? (
                            <>
                                <PauseIconOutline className="w-6 h-6 text-white group-hover:hidden" />
                                <PauseIconSolid className="w-6 h-6 text-white hidden group-hover:block" />
                            </>
                        ) : (
                            <>
                                <PlayIconOutline className="w-6 h-6 text-white group-hover:hidden" />
                                <PlayIconSolid className="w-6 h-6 text-white hidden group-hover:block" />
                            </>
                        )}
                    </IconButton>
                    <Popover
                        placement="top"
                        offset={{ mainAxis: 60 }} 
                    >
                        <PopoverHandler>
                            <IconButton variant="text" className="rounded-full w-24 h-24 group">
                                {volume === 0 ? (
                                    <>
                                        <SpeakerXMarkIconOutline className="w-6 h-6 text-white group-hover:hidden" />
                                        <SpeakerXMarkIconSolid className="w-6 h-6 text-white hidden group-hover:block" />
                                    </>
                                ) : (
                                    <>
                                        <SpeakerWaveIconOutline className="w-6 h-6 text-white group-hover:hidden" />
                                        <SpeakerWaveIconSolid className="w-6 h-6 text-white hidden group-hover:block" />
                                    </>
                                )}
                            </IconButton>
                        </PopoverHandler>
                        <PopoverContent className="w-36 p-4 bg-gray-700 text-white z-50 -rotate-90">
                            <div className="w-full">
                                <Slider
                                    defaultValue={volume} 
                                    onChange={(e) => handleVolumeChange(parseInt(e.target.value, 10))}
                                    min={0}
                                    max={100}
                                    size='md'
                                    className="!min-w-10"
                                />
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            {/* Second Block (Main Menu) */}
            <div
                className={`flex items-center justify-center md:justify-end w-full md:w-full transition-all duration-500 md:h-[100px] ${isMenuHidden ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'
                    }`}
                style={{
                    backgroundImage: `linear-gradient(to top, rgba(217, 217, 217, 0.15) 10%, rgba(115, 115, 115, 0))`,
                }}
            >

                <div className="px-4 md:px-10 flex justify-around space-x-10">
                    <Popover
                        placement="top"
                        offset={{ mainAxis: 10 }} 
                    >
                        <PopoverHandler>
                            <Button variant='text' className=" w-20 h-20 flex flex-col rounded-2xl text-white items-center group">
                                <MusicalNoteIconOutline className="w-6 h-6 text-white group-hover:hidden" />
                                <MusicalNoteIconSolid className="w-6 h-6 text-white hidden group-hover:block" />
                                <span className='text-white text-sm mt-2'>Music</span>
                            </Button>
                        </PopoverHandler>
                        <PopoverContent className="w-72 p-4 bg-gray-700 text-white z-50 max-h-60 overflow-auto">
                            <div className="w-full">
                                {videos.map((video, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center space-x-4 p-2 cursor-pointer hover:bg-gray-600 rounded-md"
                                        onClick={() => handleVideoSelect(video)}
                                    >
                                        <img src={video.thumbnail} alt={video.title} className="w-12 h-12 rounded-md" />
                                        <span>{video.title}</span>
                                    </div>
                                ))}
                            </div>
                        </PopoverContent>
                    </Popover>
                    <Popover
                        placement="top"
                        offset={{ mainAxis: 10 }} 
                    >
                        <PopoverHandler>
                            <Button variant='text' className="w-20 h-20 flex flex-col rounded-2xl text-white items-center group">
                                <SignalIconOutline className="w-6 h-6 text-white group-hover:hidden" />
                                <SignalIconSolid className="w-6 h-6 text-white hidden group-hover:block" />
                                <span className='text-white text-sm mt-2'>Sounds</span>
                            </Button>
                        </PopoverHandler>
                        <PopoverContent className="w-72 p-4 bg-gray-700 text-white z-50">
                            <div className="w-full space-y-4">
                                <div>
                                    <label className="block text-sm">Rain</label>
                                    <Slider
                                        defaultValue={ambientSounds.rain}  
                                        onChange={(e) => handleAmbientSoundChange('rain', parseInt(e.target.value, 10))}
                                        min={0}
                                        max={100}
                                        size='md'
                                        className="!min-w-10"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm">Wind</label>
                                    <Slider
                                        defaultValue={ambientSounds.wind}  
                                        onChange={(e) => handleAmbientSoundChange('wind', parseInt(e.target.value, 10))}
                                        min={0}
                                        max={100}
                                        size='md'
                                        className="!min-w-10"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm">Fireplace</label>
                                    <Slider
                                        defaultValue={ambientSounds.fireplace}  
                                        onChange={(e) => handleAmbientSoundChange('fireplace', parseInt(e.target.value, 10))}
                                        min={0}
                                        max={100}
                                        size='md'
                                        className="!min-w-10"
                                    />
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                    <Popover
                        placement="top"
                        offset={{ mainAxis: 10 }} 
                    >
                        <PopoverHandler>
                            <Button variant='text' className="w-20 h-20 flex flex-col rounded-2xl text-white items-center group">
                                <EyeIconOutline className="w-6 h-6 text-white group-hover:hidden" />
                                <EyeIconSolid className="w-6 h-6 text-white hidden group-hover:block" />
                                <span className='text-white text-sm mt-2'>Visuals</span>
                            </Button>
                        </PopoverHandler>
                        <PopoverContent className="w-36 h-36 p-4 bg-gray-700 text-white z-50">
                            <div className="w-full">

                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            {/* YouTube Player */}
            <YouTube
                videoId={selectedVideo.id} 
                opts={opts}
                onReady={onPlayerReady}
                onError={onPlayerError}
                onEnd={onPlayerEnd}
            />
        </div>
    );
};

export default BottomMenu;
