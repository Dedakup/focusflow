import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { toast } from 'react-toastify';
import { updateAmbientSoundVolume } from '../../../redux/soundSlice';
import {
    Button,
    Popover,
    PopoverHandler,
    PopoverContent,
    Slider,
} from '@material-tailwind/react';
import {
    SignalIcon as SignalIconSolid,
    SignalIcon as SignalIconOutline,
} from '@heroicons/react/24/outline';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AmbientSoundSelector = () => {
    const { user, getAccessTokenSilently } = useAuth0();
    const userId = user?.sub;
    const dispatch = useDispatch();
    const { ambientSounds } = useSelector((state) => state.ambientSound);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchAmbientSounds = async () => {
            if (!userId) return;

            setIsLoading(true);
            try {
                const token = await getAccessTokenSilently();
                const response = await fetch(
                    `${API_BASE_URL}/ambient-sounds/${userId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    },
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch ambient sounds');
                }

                const data = await response.json();
                dispatch(updateAmbientSoundVolume(data)); // Replace existing state
            } catch (error) {
                console.error('Error fetching ambient sounds:', error);
                toast.error('Error loading ambient sounds');
            } finally {
                setIsLoading(false);
            }
        };

        if (isPopoverOpen && ambientSounds.length === 0) {
            fetchAmbientSounds();
        }
    }, [dispatch, userId, getAccessTokenSilently, isPopoverOpen]);

    const handleAmbientSoundChange = (id, volume) => {
        // Update the volume for the specific ambient sound
        const updatedSounds = ambientSounds.map((sound) =>
            sound.id === id ? { ...sound, volume } : sound,
        );
        dispatch(updateAmbientSoundVolume(updatedSounds)); // Dispatch the updated sounds
    };

    return (
        <Popover
            placement="top"
            offset={{ mainAxis: 10 }}
            open={isPopoverOpen}
            onOpenChange={setIsPopoverOpen}
        >
            <PopoverHandler>
                <Button
                    variant="text"
                    className="w-20 h-20 flex flex-col rounded-2xl text-white items-center group"
                >
                    <SignalIconOutline className="w-6 h-6 text-white group-active:hidden md:group-hover:hidden" />
                    <SignalIconSolid className="w-6 h-6 text-white hidden group-active:block md:group-hover:block" />
                    <span className="text-white text-sm mt-2">Sounds</span>
                </Button>
            </PopoverHandler>
            <PopoverContent className="w-72 p-4 bg-gray-700 text-white z-50 h-96 overflow-y-auto">
                <div className="w-full space-y-4">
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        ambientSounds.map((sound) => (
                            <div key={sound.id}>
                                <label className="block text-sm">
                                    {sound.label}
                                </label>
                                <Slider
                                    value={sound.volume}
                                    onChange={(e) =>
                                        handleAmbientSoundChange(
                                            sound.id,
                                            parseInt(e.target.value, 10),
                                        )
                                    }
                                    min={0}
                                    max={100}
                                    size="md"
                                    className="!min-w-10"
                                />
                            </div>
                        ))
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default AmbientSoundSelector;
