import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setBackgrounds } from '@background';
import { Background } from '@background';
import { useAuth } from '@auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const useBackgrounds = (isPopoverOpen: boolean) => {
    const [isLoading, setIsLoading] = useState(false);
    const { userId, getAuthHeader } = useAuth();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchBackgrounds = async () => {
            if (!userId) return;

            setIsLoading(true);
            try {
                const headers = await getAuthHeader();
                const response = await fetch(
                    `${API_BASE_URL}/backgrounds/${userId}`,
                    {
                        headers: {
                            ...headers,
                            'Content-Type': 'application/json',
                        },
                    },
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch backgrounds');
                }

                const data = await response.json();
                dispatch(setBackgrounds(data));
            } catch (error) {
                console.error('Error fetching backgrounds:', error);
                toast.error('Error loading backgrounds');
            } finally {
                setIsLoading(false);
            }
        };

        if (isPopoverOpen) {
            fetchBackgrounds();
        }
    }, [dispatch, userId, getAuthHeader, isPopoverOpen]);

    return { isLoading };
}; 