import React, { useState } from 'react';
import VideoBackground from './components/VideoBackground';
import TopMenu from './components/TopMenu';
import PomodoroTimer from './components/PomodoroTimer';
import BottomMenu from './components/BottomMenu';
import backgrounds from './assets/backgrounds';

export default function App() {
    const [background, setBackground] = useState(backgrounds[0]);

    const handleBackgroundChange = (newSrc) => {
        const selectedBackground = backgrounds.find(bg => bg.src === newSrc);
        setBackground(selectedBackground);
    };

    return (
        <div className="relative flex flex-col h-screen overflow-hidden" style={{ color: background.textColor }}>
            <VideoBackground backgroundSrc={background.src} />

            <div className="h-25">
                <TopMenu textColor={background.textColor} />
            </div>

            <div className="flex-grow relative z-10">
                <PomodoroTimer textColor={background.textColor} />
            </div>

            <div className="h-25">
                <BottomMenu onBackgroundChange={handleBackgroundChange} backgrounds={backgrounds} textColor={background.textColor} />
            </div>
        </div>
    );
}
