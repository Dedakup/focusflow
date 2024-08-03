import React from 'react';
import VideoBackground from './components/VideoBackground';
import TopMenu from './components/TopMenu';
import PomodoroTimer from './components/PomodoroTimer';
import BottomMenu from './components/BottomMenu';

function App() {
  return (
    <div className="relative flex flex-col h-screen overflow-hidden">
      {/* Видео-фон */}
      <VideoBackground />

      {/* Верхнее меню */}
      <div className="h-16 bg-gray-800 text-white flex items-center justify-center z-10">
        <TopMenu />
      </div>

      {/* Контент с таймером */}
      <div className="flex-grow relative z-10">
        <PomodoroTimer />
      </div>

      {/* Нижнее меню */}
      <div className=" flex items-center justify-center z-10">
        <BottomMenu />
      </div>
    </div>
  );
}

export default App;
