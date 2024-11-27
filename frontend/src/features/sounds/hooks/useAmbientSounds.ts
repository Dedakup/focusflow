import { useState, useEffect, useRef } from 'react';
import { ambientSoundsData } from '../assets/sounds';

export const useAmbientSounds = () => {
    const [ambientSounds, setAmbientSounds] = useState(ambientSoundsData);
    const soundRefs = useRef({});

    const handleAmbientSoundChange = (id, newValue) => {
        setAmbientSounds((prev) =>
            prev.map((sound) =>
                sound.id === id ? { ...sound, volume: newValue } : sound,
            ),
        );
    };

    useEffect(() => {
        ambientSounds.forEach((sound) => {
            const audioElement = soundRefs.current[sound.id];
            if (audioElement) {
                audioElement.volume = sound.volume / 100;
                if (sound.volume > 0) audioElement.play();
                else audioElement.pause();
            }
        });
    }, [ambientSounds]);

    return { ambientSounds, soundRefs, handleAmbientSoundChange };
};
