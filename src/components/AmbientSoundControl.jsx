import React from 'react';
import { Button, Popover, PopoverHandler, PopoverContent, Slider } from "@material-tailwind/react";
import {
    SignalIcon as SignalIconSolid,
    SignalIcon as SignalIconOutline
} from '@heroicons/react/24/solid';

const AmbientSoundControl = ({ ambientSounds, handleAmbientSoundChange }) => {
    return (
        <Popover placement="top" offset={{ mainAxis: 10 }}>
            <PopoverHandler>
                <Button variant='text' className="w-20 h-20 flex flex-col rounded-2xl text-white items-center group">
                    <SignalIconOutline className="w-6 h-6 text-white group-active:hidden md:group-hover:hidden" />
                    <SignalIconSolid className="w-6 h-6 text-white hidden group-active:block md:group-hover:block" />
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
    );
};

export default AmbientSoundControl;
