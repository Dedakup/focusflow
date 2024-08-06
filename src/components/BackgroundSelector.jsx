import React from 'react';
import { Button, Popover, PopoverHandler, PopoverContent } from "@material-tailwind/react";
import {
    EyeIcon as EyeIconSolid,
    EyeIcon as EyeIconOutline
} from '@heroicons/react/24/solid';

const BackgroundSelector = ({ backgrounds, handleBackgroundSelect }) => {
    return (
        <Popover placement="top" offset={{ mainAxis: 10 }}>
            <PopoverHandler>
                <Button variant='text' className="w-20 h-20 flex flex-col rounded-2xl text-white items-center group">
                    <EyeIconOutline className="w-6 h-6 text-white group-active:hidden md:group-hover:hidden" />
                    <EyeIconSolid className="w-6 h-6 text-white hidden group-active:block md:group-hover:block" />
                    <span className='text-white text-sm mt-2'>Visuals</span>
                </Button>
            </PopoverHandler>
            <PopoverContent className="w-72 p-4 bg-gray-700 text-white z-50">
                <div className="w-full space-y-4 grid grid-cols">
                    {backgrounds.map((background, index) => (
                        <div
                            key={index}
                            className="relative cursor-pointer rounded-md overflow-hidden border"
                            style={{
                                height: '100px',
                                transition: 'transform 0.3s, border-color 0.3s',
                            }}
                            onClick={() => handleBackgroundSelect(background)}
                            onMouseEnter={(e) => e.currentTarget.style.borderColor = '#fff'}
                            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
                        >
                            <video
                                src={background.src}
                                muted
                                autoPlay
                                loop
                                className="absolute inset-0 w-full h-full object-cover"
                            ></video>
                        </div>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default BackgroundSelector;
