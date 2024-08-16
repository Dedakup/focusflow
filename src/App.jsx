import React, { useEffect, useState } from 'react';
import VideoBackground from './components/VideoBackground';
import TopMenu from './components/TopMenu';
import PomodoroTimer from './components/PomodoroTimer';
import BottomMenu from './components/BottomMenu';
import backgrounds from './assets/backgrounds';

export default function App() {
  // Set a fallback value for the background in case backgrounds array is empty
  const [background, setBackground] = useState(
    backgrounds[0] || { src: '', name: 'Default' }
  );

  const handleBackgroundChange = (newSrc) => {
    const selectedBackground = backgrounds.find((bg) => bg.src === newSrc);
    if (selectedBackground) {
      setBackground(selectedBackground);
    } else {
      setBackground(backgrounds[0]);
    }
  };

  useEffect(() => {
    const storedBackground = JSON.parse(
      window.localStorage.getItem('selectedBackground')
    );
    if (storedBackground) {
      handleBackgroundChange(storedBackground);
    }
  }, [handleBackgroundChange]);
  console.log(backgrounds[0]);
  return (
    <div className="relative flex flex-col h-screen overflow-hidden">
      <VideoBackground
        backgroundSrc={!background.src ? backgrounds[0] : background.src}
      />

      <div className="h-25">
        <TopMenu />
      </div>

      <div className="flex-grow relative z-10">
        <PomodoroTimer />
      </div>

      <div className="h-25" lazy>
        <BottomMenu
          onBackgroundChange={handleBackgroundChange}
          backgrounds={backgrounds}
        />
      </div>
    </div>
  );
}
