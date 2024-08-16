'use client';

import React, { useState, useEffect, Suspense } from 'react';

// Lazy load components
const VideoBackground = React.lazy(() => import('./ui/VideoBackground'));
const TopMenu = React.lazy(() => import('./ui/TopMenu'));
const PomodoroTimer = React.lazy(() => import('./ui/PomodoroTimer'));
const BottomMenu = React.lazy(() => import('./ui/BottomMenu'));

export default function Page() {
  const [background, setBackground] = useState(null);
  const [backgrounds, setBackgrounds] = useState([]);

  useEffect(() => {
    // Fetch backgrounds from API
    fetch('http://localhost:5000/api/backgrounds')
      .then(response => response.json())
      .then(data => {
        setBackgrounds(data);
        setBackground(data[0] || { src: '', name: 'Default', thumbnailSrc: '' });
      })
      .catch(error => console.error('Error fetching backgrounds:', error));
  }, []);

  const handleBackgroundChange = (newSrc) => {
    const selectedBackground = backgrounds.find(bg => bg.src === newSrc);
    if (selectedBackground) {
      setBackground(selectedBackground);
    }
  };

  return (
    <main className="relative flex flex-col h-screen overflow-hidden">
      <Suspense fallback={<div>Loading...</div>}>
        {background && <VideoBackground backgroundSrc={background.src} />}
        <div className="h-25">
          <TopMenu />
        </div>
        <div className="flex-grow relative z-10">
          <PomodoroTimer />
        </div>
        <div className="h-25">
          <BottomMenu onBackgroundChange={handleBackgroundChange} backgrounds={backgrounds} />
        </div>
      </Suspense>
    </main>
  );
}