'use client';

import { Auth0Provider } from '@auth0/auth0-react';
import TopMenu from '@dashboard/components/TopMenu';
import NProgress from 'nprogress';
import { useEffect, useState } from 'react';
import { ReduxProvider } from '@components/common/ReduxProvider';

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        NProgress.configure({ showSpinner: false });
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null; // or a loading state
    }

    return (
        <ReduxProvider>
            <Auth0Provider
                domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN || ''}
                clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || ''}
                authorizationParams={{
                    redirect_uri: process.env.NEXT_PUBLIC_AUTH0_CALLBACK_URL || '',
                }}
            >
                <div id="root">
                    <TopMenu />
                    {children}
                </div>
            </Auth0Provider>
        </ReduxProvider>
    );
}
