import React, { useState } from 'react';
import { IconButton, Popover, PopoverHandler, PopoverContent, Slider } from '@your-ui-library'; // Замените на правильный импорт из вашей UI библиотеки

const MusicPlayerComponent = ({ video }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(50); // Уровень звука

    const handlePlayClick = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <div className={`absolute flex items-center justify-between w-full md:w-auto md:mb-0 duration-500 z-10`}>
            <div className="flex items-center pl-4 pb-4 md:pl-10 md:pb-0">
                <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer">
                    <img
                        src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                        alt={video.title}
                        className="w-16 h-16 md:w-20 md:h-20 bg-gray-200 rounded-md object-cover"
                    />
                </a>
                <div className="flex flex-col text-left ml-4">
                    <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer">
                        <div className="text-white">{video.title}</div>
                    </a>
                </div>
            </div>
            <div
                className={`flex items-center pr-4 pb-4 md:pr-0 md:pb-0 md:ml-40 space-x-10 duration-500 z-10`}
            >
                <IconButton variant="text" className="rounded-full w-24 h-24" onClick={handlePlayClick}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-white"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d={isPlaying ? 'M6 18L18 12L6 6V18Z' : 'M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z'}
                        />
                    </svg>
                </IconButton>
                <Popover placement="top" offset={{ mainAxis: 60 }}>
                    <PopoverHandler>
                        <IconButton variant="text" className="rounded-full w-24 h-24">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6 text-white"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                                />
                            </svg>
                        </IconButton>
                    </PopoverHandler>
                    <PopoverContent className="w-36 p-4 bg-gray-700 text-white z-50">
                        <div className="w-full">
                            <Slider
                                value={volume}
                                onChange={(e) => setVolume(e.target.value)}
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
    );
};

export default Music;
