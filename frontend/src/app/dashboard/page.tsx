'use client';

import React from 'react';
import { Provider } from 'react-redux';
import PomodoroTimer from '@pomodoro/components/PomodoroTimer';
import { store } from '@app/store';
import { useAuth0 } from '@auth0/auth0-react';
import VideoBackground from '@background/components/VideoBackground';

export default function Dashboard() {
    const { isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        isAuthenticated && (
            <Provider store={store}>
                <div className="relative flex flex-col h-screen w-screen overflow-hidden bg-gray-800 dashboard-container">
                    <div className="flex-grow relative z-10">
                        <PomodoroTimer />
                    </div>
                    <VideoBackground />
                </div>
            </Provider>
        )
    );
}
