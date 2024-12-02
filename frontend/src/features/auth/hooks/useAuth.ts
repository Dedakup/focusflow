import { useAuth0 } from '@auth0/auth0-react';
import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';

interface UseAuthReturn {
    userId: string | undefined;
    getAuthHeader: () => Promise<{ Authorization: string }>;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: Error | null;
}

export const useAuth = (): UseAuthReturn => {
    const { user, getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();
    const [error, setError] = useState<Error | null>(null);
    
    const getAuthHeader = useCallback(async () => {
        try {
            const token = await getAccessTokenSilently();
            return {
                Authorization: `Bearer ${token}`
            };
        } catch (err) {
            const error = err instanceof Error ? err : new Error('Failed to get auth token');
            setError(error);
            toast.error('Authentication error');
            throw error;
        }
    }, [getAccessTokenSilently]);

    return {
        userId: user?.sub,
        getAuthHeader,
        isAuthenticated,
        isLoading,
        error
    };
}; 