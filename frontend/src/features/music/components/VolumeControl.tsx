import React from 'react';
import PropTypes from 'prop-types';
import {
    IconButton,
    Popover,
    PopoverHandler,
    PopoverContent,
    Slider,
} from '@material-tailwind/react';
import {
    PlayIcon as PlayIconSolid,
    PauseIcon as PauseIconSolid,
    SpeakerXMarkIcon as SpeakerXMarkIconSolid,
    SpeakerWaveIcon as SpeakerWaveIconSolid,
} from '@heroicons/react/24/solid';
import {
    PlayIcon as PlayIconOutline,
    PauseIcon as PauseIconOutline,
    SpeakerWaveIcon as SpeakerWaveIconOutline,
    SpeakerXMarkIcon as SpeakerXMarkIconOutline,
} from '@heroicons/react/24/outline';

interface VolumeControlProps {
    isPlaying: boolean;
    handlePlayPause: () => void;
    volume: number;
    handleVolumeChange: (value: number) => void;
}

const VolumeControl = ({ isPlaying, handlePlayPause, volume, handleVolumeChange }: VolumeControlProps) => {
    return (
        <div className="flex items-center space-x-4 md:pl-16 pr-6">
            <IconButton
                placeholder="Volume control"
                variant="text"
                className="rounded-full w-24 h-24 group"
                onClick={handlePlayPause}
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
            >
                {isPlaying ? (
                    <>
                        <PauseIconOutline className="w-6 h-6 text-white group-active:hidden group-hover:hidden" />
                        <PauseIconSolid className="w-6 h-6 text-white hidden group-active:block group-hover:block" />
                    </>
                ) : (
                    <>
                        <PlayIconOutline className="w-6 h-6 text-white group-active:hidden group-hover:hidden" />
                        <PlayIconSolid className="w-6 h-6 text-white hidden group-active:block group-hover:block" />
                    </>
                )}
            </IconButton>

            <Popover placement="top" offset={60}>
                <PopoverHandler>
                    <IconButton
                        placeholder="Volume control"
                        variant="text"
                        className="rounded-full w-24 h-24 group"
                        onPointerEnterCapture={() => {}}
                        onPointerLeaveCapture={() => {}}
                    >
                        {volume === 0 ? (
                            <>
                                <SpeakerXMarkIconOutline className="w-6 h-6 text-white group-active:hidden md:group-hover:hidden" />
                                <SpeakerXMarkIconSolid className="w-6 h-6 text-white hidden group-active:block md:group-hover:block" />
                            </>
                        ) : (
                            <>
                                <SpeakerWaveIconOutline className="w-6 h-6 text-white group-active:hidden md:group-hover:hidden" />
                                <SpeakerWaveIconSolid className="w-6 h-6 text-white hidden group-active:block md:group-hover:block" />
                            </>
                        )}
                    </IconButton>
                </PopoverHandler>
                <PopoverContent 
                    placeholder="Volume control popup" 
                    className="w-36 p-4 bg-gray-700 text-white z-50 -rotate-90 ml-8 md:ml-0"
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                >
                    <div className="w-full">
                        <Slider
                            placeholder="Volume slider"
                            defaultValue={volume}
                            onChange={(e) => handleVolumeChange(parseInt(e.target.value, 10))}
                            min={0}
                            max={100}
                            size="md"
                            className="!min-w-10"
                            onPointerEnterCapture={() => {}}
                            onPointerLeaveCapture={() => {}}
                        />
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};

VolumeControl.propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    handlePlayPause: PropTypes.func.isRequired,
    volume: PropTypes.number.isRequired,
    handleVolumeChange: PropTypes.func.isRequired,
};

export default VolumeControl;
