import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Button,
    Popover,
    PopoverHandler,
    PopoverContent,
} from '@material-tailwind/react';
import { EyeIcon as EyeIconSolid } from '@heroicons/react/24/solid';
import { EyeIcon as EyeIconOutline } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import { setBackgrounds, selectBackground } from '../redux/backgroundSlice';
import { useAuth0 } from '@auth0/auth0-react';
import SkeletonLoader from './skeletons/SkeletonLoader';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const BackgroundSelector = () => {
    const { user, getAccessTokenSilently } = useAuth0();
    const userId = user?.sub;
    const dispatch = useDispatch();
    const { backgrounds, selectedBackground } = useSelector(
        (state) => state.background,
    );
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchBackgrounds = async () => {
            if (!userId) return;

            setIsLoading(true);
            try {
                const token = await getAccessTokenSilently();
                const response = await fetch(
                    `${API_BASE_URL}/backgrounds/${userId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    },
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch backgrounds');
                }

                const data = await response.json();
                dispatch(setBackgrounds(data)); // Replace existing state
            } catch (error) {
                console.error('Error fetching backgrounds:', error);
                toast.error('Error loading backgrounds');
            } finally {
                setIsLoading(false);
            }
        };

        if (isPopoverOpen && backgrounds.length === 0) {
            fetchBackgrounds();
        }
    }, [dispatch, userId, getAccessTokenSilently, isPopoverOpen]);

    const handleBackgroundSelect = async (background) => {
        dispatch(selectBackground(background));
        /*try {
      const token = await getAccessTokenSilently();
      const url = `${API_BASE_URL}/backgrounds/${userId}/select`;
      console.log(url);
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ selectedBackground: background }),
      });

      if (!response.ok) throw new Error('Failed to update background');
      toast.success(`Background changed to "${background.name}"`);
    } catch (error) {
      console.error('Error updating background:', error);
      toast.error('Failed to change background');
    }*/
    };

    return (
        <Popover
            placement="top"
            offset={{ mainAxis: 10 }}
            open={isPopoverOpen}
            handler={setIsPopoverOpen}
            inert={isPopoverOpen}
        >
            <PopoverHandler>
                <Button
                    variant="text"
                    className="w-20 h-20 flex flex-col rounded-2xl text-white items-center group"
                >
                    <EyeIconOutline className="w-6 h-6 text-white group-active:hidden md:group-hover:hidden" />
                    <EyeIconSolid className="w-6 h-6 text-white hidden group-active:block md:group-hover:block" />
                    <span className="text-white text-sm mt-2">Visuals</span>
                </Button>
            </PopoverHandler>
            {isPopoverOpen && (
                <PopoverContent className="w-72 h-96 overflow-y-auto p-4 bg-gray-700 text-white z-50">
                    {isLoading ? (
                        <SkeletonLoader rows={5} />
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {backgrounds.map((background) => (
                                <div
                                    key={background.name}
                                    className={`relative cursor-pointer rounded-md overflow-hidden border ${
                                        selectedBackground?.name ===
                                        background.name
                                            ? 'border-blue-500'
                                            : ''
                                    }`}
                                    onClick={() =>
                                        handleBackgroundSelect(background)
                                    }
                                >
                                    <img
                                        src={background.thumbnailSrc}
                                        alt={background.name}
                                        className="w-full h-24 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black opacity-0 hover:opacity-30 transition-opacity" />
                                </div>
                            ))}
                        </div>
                    )}
                </PopoverContent>
            )}
        </Popover>
    );
};

export default BackgroundSelector;
