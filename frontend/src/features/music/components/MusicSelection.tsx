import React from 'react';
import {
    Button,
    Popover,
    PopoverHandler,
    PopoverContent,
} from '@material-tailwind/react';
import { MusicalNoteIcon as MusicalNoteIconSolid } from '@heroicons/react/24/solid';
import { MusicalNoteIcon as MusicalNoteIconOutline } from '@heroicons/react/24/outline';

interface MusicSource {
    title: string;
    thumbnail: string;
}

const musicSources: MusicSource[] = [
    // Add your music sources here
];

const MusicSelection = () => {
    const handleMusicSourceSelect = (musicSource: MusicSource) => {
        // Handle music selection
    };

    return (
        <Popover placement="top" offset={{ mainAxis: 10 }}>
            <PopoverHandler>
                <Button
                    variant="text"
                    className="w-20 h-20 flex flex-col rounded-2xl text-white items-center group"
                    placeholder=""
                >
                    <MusicalNoteIconOutline className="w-6 h-6 text-white group-active:hidden md:group-hover:hidden" />
                    <MusicalNoteIconSolid className="w-6 h-6 text-white hidden group-active:block md:group-hover:block" />
                    <span className="text-white text-sm mt-2">Music</span>
                </Button>
            </PopoverHandler>
            <PopoverContent
                className="w-72 p-4 bg-gray-700 text-white z-50 max-h-60 overflow-auto"
                placeholder=""
            >
                <div className="w-full">
                    {musicSources.map(
                        (musicSource: MusicSource, index: number) => (
                            <div
                                key={index}
                                className="flex items-center space-x-4 p-2 cursor-pointer hover:bg-gray-600 rounded-md"
                                onClick={() =>
                                    handleMusicSourceSelect(musicSource)
                                }
                            >
                                <img
                                    src={musicSource.thumbnail}
                                    alt={musicSource.title}
                                    className="w-12 h-12 rounded-md"
                                />
                                <span>{musicSource.title}</span>
                            </div>
                        ),
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default MusicSelection;
