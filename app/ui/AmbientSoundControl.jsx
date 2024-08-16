import dynamic from 'next/dynamic';
import { useMemo, useEffect, useState } from 'react';
import { Button, Popover, PopoverHandler, PopoverContent, Slider } from "@material-tailwind/react";
import { SignalIcon as SignalIconOutline } from '@heroicons/react/24/outline';
import { SignalIcon as SignalIconSolid } from '@heroicons/react/24/solid';

const AmbientSoundControl = ({ ambientSounds, handleAmbientSoundChange }) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        // Set the component as loaded after the page has fully loaded
        const handleLoad = () => setLoaded(true);

        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
            return () => window.removeEventListener('load', handleLoad);
        }
    }, []);

    // Memoizing the sound controls to avoid unnecessary re-renders
    const soundControls = useMemo(() => (
        ambientSounds.map(sound => (
            <div key={sound.id}>
                <label className="block text-sm">{sound.label}</label>
                <Slider
                    defaultValue={sound.volume}
                    onChange={(e) => handleAmbientSoundChange(sound.id, parseInt(e.target.value, 10))}
                    min={0}
                    max={100}
                    size="md"
                    className="!min-w-10"
                />
            </div>
        ))
    ), [ambientSounds, handleAmbientSoundChange]);

    return (
        loaded && (
            <Popover placement="top" offset={10}>
                <PopoverHandler>
                    <Button variant="text" className="w-20 h-20 flex flex-col rounded-2xl text-white items-center group">
                        <SignalIconOutline className="w-6 h-6 text-white group-active:hidden md:group-hover:hidden" />
                        <SignalIconSolid className="w-6 h-6 text-white hidden group-active:block md:group-hover:block" />
                        <span className="text-white text-sm mt-2">Sounds</span>
                    </Button>
                </PopoverHandler>
                <PopoverContent className="w-72 p-4 bg-gray-700 text-white z-50 h-96 overflow-y-auto">
                    <div className="w-full space-y-4">
                        {soundControls}
                    </div>
                </PopoverContent>
            </Popover>
        )
    );
};

export default dynamic(() => Promise.resolve(AmbientSoundControl), { ssr: false });
