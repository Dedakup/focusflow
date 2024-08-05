import React, { useState, useRef } from 'react';
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

const BottomMenu = () => {
    const videos = [
        {
            id: 'dQw4w9WgXcQ',
            title: 'Never Gonna Give You Up',
            thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg',
        },
        {
            id: '5NV6Rdv1a3I',
            title: 'Get Lucky - Daft Punk ft. Pharrell Williams',
            thumbnail: 'https://img.youtube.com/vi/5NV6Rdv1a3I/0.jpg',
        },
        {
            id: 'tVj0ZTS4WF4',
            title: 'Happy - Pharrell Williams',
            thumbnail: 'https://img.youtube.com/vi/tVj0ZTS4WF4/0.jpg',
        }
    ];

    const [isMenuHidden, setIsMenuHidden] = useState(false);
    const [volume, setVolume] = useState(100);
    const [selectedVideo, setSelectedVideo] = useState(videos[0]);
    const [isPlaying, setIsPlaying] = useState(true);
    const [error, setError] = useState(null);
    const playerRef = useRef(null);

    const handlePlayPause = () => {
        if (isPlaying) {
            playerRef.current.pauseVideo();
        } else {
            playerRef.current.playVideo();
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

    const handleVideoSelect = (video) => {
        setSelectedVideo(video);
        setIsPlaying(true);
    };

    const onPlayerReady = (event) => {
        playerRef.current = event.target;
        event.target.playVideo();
        event.target.unMute();
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
            autoplay: 1,
            controls: 0,
            mute: 1, // Starts in mute mode
        },
    };

    return (
        <div
            className={`fixed bottom-0 left-0 right-0 z-50 flex items-center flex-col md:flex-row transition-all `}
            style={{ height: 'auto' }}
        >
            {/* Alert for errors */}
            {error && (
                <Alert color="red" onClose={() => setError(null)} className="fixed top-4 right-4 w-1/3">
                    {error}
                </Alert>
            )}

            {/* Music */}
            <div
                className={`absolute flex items-center justify-between w-full md:w-auto md:mb-0 duration-500 ${isMenuHidden ? '-translate-y-4 md:translate-y-0' : '-translate-y-20 md:translate-y-0'} z-10`}
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
                        offset={{ mainAxis: 60 }} // Offset 100 units above the element
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
                                    value={volume}
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
                        offset={{ mainAxis: 10 }} // Offset 100 units above the element
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
                        offset={{ mainAxis: 10 }} // Offset 100 units above the element
                    >
                        <PopoverHandler>
                            <Button variant='text' className="w-20 h-20 flex flex-col rounded-2xl text-white items-center group">
                                <SignalIconOutline className="w-6 h-6 text-white group-hover:hidden" />
                                <SignalIconSolid className="w-6 h-6 text-white hidden group-hover:block" />
                                <span className='text-white text-sm mt-2'>Sounds</span>
                            </Button>
                        </PopoverHandler>
                        <PopoverContent className="w-36 h-36 p-4 bg-gray-700 text-white z-50">
                            <div className="w-full">

                            </div>
                        </PopoverContent>
                    </Popover>
                    <Popover
                        placement="top"
                        offset={{ mainAxis: 10 }} // Offset 100 units above the element
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
                videoId={selectedVideo.id} // Ensure selectedVideo.id is a valid YouTube video ID
                opts={opts}
                onReady={onPlayerReady}
                onError={onPlayerError}
                onEnd={onPlayerEnd}
            />

        </div>
    );
};

export default BottomMenu;
