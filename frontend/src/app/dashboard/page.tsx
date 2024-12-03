'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { Timer } from '@timer';
import { store } from 'src/shared/store/store';
import { useAuth0 } from '@auth0/auth0-react';
import { BackgroundComponent } from '@background';

export default function Dashboard() {
    const { isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    //make function to fast turn on and turn off component for granual control and development
    return (
        isAuthenticated && (
            <Provider store={store}>
                <div className="relative flex flex-col h-screen w-screen overflow-hidden bg-gray-800 dashboard-container">
                    {/* <div className="flex-grow relative z-10">
                        <Timer />
                    </div> */}
                    <BackgroundComponent />
                </div>
            </Provider>
        )
    );
}
