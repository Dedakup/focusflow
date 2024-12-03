'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth0 } from '@auth0/auth0-react';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { isLoading, isAuthenticated } = useAuth0();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/');
        }
    }, [isLoading, isAuthenticated, router]);

    if (isLoading) {
        return null; // Or return a loading spinner component
    }

    if (!isAuthenticated) {
        return null;
    }

    return children;
};

export default ProtectedRoute;
