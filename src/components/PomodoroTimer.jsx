import React, { useState, useEffect } from 'react';
import TimerCircle from './TimerCircle';
import SettingsPopover from './SettingsPopover';
import TaskPopover from './TaskPopover';
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PomodoroTimer = () => {
  const initialRadius = 115;
  const expandedRadius = 175;
  const defaultPomodoroTime = 1500; // 25 minutes in seconds
  const defaultShortBreakTime = 300; // 5 minutes in seconds
  const defaultLongBreakTime = 900; // 15 minutes in seconds

  // State Initialization
  const [radius, setRadius] = useState(initialRadius);
  const [timeLeft, setTimeLeft] = useState(defaultPomodoroTime);
  const [isActive, setIsActive] = useState(false);
  const [cycle, setCycle] = useState(1);
  const [phase, setPhase] = useState('work'); // 'work', 'shortBreak', 'longBreak'
  const [hasStarted, setHasStarted] = useState(false);
  const [pomodoroTime, setPomodoroTime] = useState(25); // in minutes
  const [shortBreakTime, setShortBreakTime] = useState(5); // in minutes
  const [longBreakTime, setLongBreakTime] = useState(15); // in minutes
  const [isVisible, setIsVisible] = useState(true);
  const [tasks, setTasks] = useState(() => {
    try {
      return JSON.parse(window.localStorage.getItem('Tasks')) || [];
    } catch (error) {
      console.error("Error parsing tasks from localStorage", error);
      return [];
    }
  });
  const [newTask, setNewTask] = useState('');
  const [currentTaskId, setCurrentTaskId] = useState(null); // Store the current task ID

  // Notify user when 1 minute is left
  useEffect(() => {
    if (timeLeft === 60) {
      toast.info('You have 1 minute left', {
        position: 'top-center',
        transition: Zoom,
      });
    }

    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(interval);
            handlePhaseTransition();
            return prevTime;
          }
        });
      }, 1000);
    } else if (!isActive && timeLeft !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handlePhaseTransition = () => {
    if (phase === 'work') {
      if (cycle < 4) {
        setPhase('shortBreak');
        setTimeLeft(shortBreakTime * 60); // Convert to seconds
        setCycle(cycle + 1);
      } else {
        setPhase('longBreak');
        setTimeLeft(longBreakTime * 60); // Convert to seconds
        setCycle(1);
      }
    } else {
      setPhase('work');
      setTimeLeft(pomodoroTime * 60); // Convert to seconds
    }
    setIsActive(true);
  };

  const toggleTimer = () => {
    if (!hasStarted) setHasStarted(true);
    setIsActive(!isActive);
    setRadius(isActive ? initialRadius : expandedRadius);
  };

  const resetTimer = (event) => {
    event.stopPropagation(); // Prevent the timer from starting
    setTimeLeft(pomodoroTime * 60);
    setIsActive(false);
    setPhase('work');
    setCycle(1);
    setHasStarted(false);
    setRadius(initialRadius); // Reset radius to initial
  };

  // Handle visibility transitions based on timer status
  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => {
        setIsVisible(false); // Hide element after animation completes
      }, 500); // Animation duration 500ms
      return () => clearTimeout(timer);
    } else {
      setIsVisible(true);
    }
  }, [isActive]);

  const handlePomodoroChange = (e) => {
    setPomodoroTime(e.target.value);
    if (phase === 'work') {
      setTimeLeft(e.target.value * 60); // Convert to seconds
    }
  };

  const handleShortBreakChange = (e) => {
    setShortBreakTime(e.target.value);
  };

  const handleLongBreakChange = (e) => {
    setLongBreakTime(e.target.value);
  };

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), name: newTask, completed: false }]);
      setNewTask('');
      toast.success('Task added!', {
        position: 'top-right',
        transition: Zoom,
      });
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast.error('Task deleted!', {
      position: 'top-right',
      transition: Zoom,
    });
  };

  const toggleCompleteTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const selectTaskForSession = (id) => {
    setCurrentTaskId(id);
  };

  useEffect(() => {
    window.localStorage.setItem('Tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <>
      <ToastContainer />
      <div className="absolute inset-0 flex flex-col items-center justify-center z-50">
        <div className="flex items-center">
          {/* Task Popover */}
          <TaskPopover
            tasks={tasks}
            setTasks={setTasks}
            newTask={newTask}
            setNewTask={setNewTask}
            addTask={addTask}
            deleteTask={deleteTask}
            toggleCompleteTask={toggleCompleteTask}
            selectTaskForSession={selectTaskForSession}
            currentTaskId={currentTaskId}
          />
          {/* Timer Circle */}
          <TimerCircle
            radius={radius}
            timeLeft={timeLeft}
            isActive={isActive}
            toggleTimer={toggleTimer}
            resetTimer={resetTimer}
            phase={phase}
            hasStarted={hasStarted}
          />
          {/* Settings Popover */}
          <SettingsPopover
            isVisible={isVisible}
            isActive={isActive}
            handlePomodoroChange={handlePomodoroChange}
            handleShortBreakChange={handleShortBreakChange}
            handleLongBreakChange={handleLongBreakChange}
            pomodoroTime={pomodoroTime}
            shortBreakTime={shortBreakTime}
            longBreakTime={longBreakTime}
          />
        </div>
        {/* Current Task Section */}
        <div className="text-center mt-[32px] mb-2">
          <span className="text-lg text-white">
            {currentTaskId
              ? tasks.find((task) => task.id === currentTaskId)?.name
              : 'No task selected'}
          </span>
        </div>
        {phase === 'work' && (
          <span className="text-sm text-white mt-[8px]">
            {'Breaks until long break: ' + (4 - cycle)}
          </span>
        )}
      </div>
    </>
  );
};

export default PomodoroTimer;
