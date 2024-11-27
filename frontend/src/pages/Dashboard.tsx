import React from 'react';
import { Provider } from 'react-redux';
import VideoBackground from '../components/VideoBackground';
import TopMenu from '../components/TopMenu';
import PomodoroTimer from '../components/PomodoroTimer';
import BottomMenu from '../components/BottomMenu';
import BackgroundSelector from '../components/BackgroundSelector';
import store from '../redux/store';
import { useAuth0 } from '@auth0/auth0-react';

const Dashboard = () => {
    const { isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        isAuthenticated && (
            <Provider store={store}>
                <div className="relative flex flex-col h-screen overflow-hidden bg-gray-800">
                    <div className="h-25">
                        <TopMenu />
                    </div>

                    <div className="flex-grow relative z-10">
                        <PomodoroTimer />
                    </div>

                    <div className="h-25">
                        <BottomMenu>
                            <BackgroundSelector />
                        </BottomMenu>
                    </div>

                    <VideoBackground />
                </div>
            </Provider>
        )
    );
};

export default Dashboard;
