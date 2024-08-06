import React from 'react';
import { Button, Popover, PopoverHandler, PopoverContent } from "@material-tailwind/react";
import {
    MusicalNoteIcon as MusicalNoteIconSolid
} from '@heroicons/react/24/solid';

import {
    MusicalNoteIcon as MusicalNoteIconOutline
} from '@heroicons/react/24/outline';

const MusicSelection = ({ videos, handleVideoSelect }) => {
    return (
        <Popover placement="top" offset={{ mainAxis: 10 }}>
            <PopoverHandler>
                <Button variant='text' className="w-20 h-20 flex flex-col rounded-2xl text-white items-center group">
                    <MusicalNoteIconOutline className="w-6 h-6 text-white group-active:hidden md:group-hover:hidden" />
                    <MusicalNoteIconSolid className="w-6 h-6 text-white hidden group-active:block md:group-hover:block" />
                    <span className='text-white text-sm mt-2'>Music</span>
                </Button>
            </PopoverHandler>
            <PopoverContent className="w-72 p-4 bg-gray-700 text-white z-50 max-h-60 overflow-auto">
                <div className="w-full">
                    {videos.map((video, index) => (
                        <div key={index} className="flex items-center space-x-4 p-2 cursor-pointer hover:bg-gray-600 rounded-md" onClick={() => handleVideoSelect(video)}>
                            <img src={video.thumbnail} alt={video.title} className="w-12 h-12 rounded-md" />
                            <span>{video.title}</span>
                        </div>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default MusicSelection;
