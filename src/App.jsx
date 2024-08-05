import VideoBackground from '../../focusflow/src/components/VideoBackground';
import TopMenu from '../../focusflow/src/components/TopMenu';
import PomodoroTimer from '../../focusflow/src/components/PomodoroTimer';
import BottomMenu from '../../focusflow/src/components/BottomMenu';

export default function App() {

  return (
    <div className="relative flex flex-col h-screen overflow-hidden">
      {/* Видео-фон */}
      <VideoBackground/>

      {/* Верхнее меню */}
      <div className="h-25">
        <TopMenu />
      </div>

      {/* Контент с таймером */}
      <div className="flex-grow relative z-10 ">
        <PomodoroTimer />
      </div>

      {/* Нижнее меню */}
      <div className="h-25">
        <BottomMenu/>
      </div>
    </div>
  );
}
