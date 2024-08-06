import React, { useState, useEffect } from 'react';
import TimerCircle from './TimerCircle';
import SettingsPopover from './SettingsPopover';
import TaskPopover from './TaskPopover.jsx';

const PomodoroTimer = () => {
    const initialRadius = 115;
    const expandedRadius = 175;
    const defaultPomodoroTime = 1500; // 25 minutes in seconds
    const defaultShortBreakTime = 300; // 5 minutes in seconds
    const defaultLongBreakTime = 900; // 15 minutes in seconds

    const [radius, setRadius] = useState(initialRadius);
    const [timeLeft, setTimeLeft] = useState(defaultPomodoroTime);
    const [isActive, setIsActive] = useState(false);
    const [cycle, setCycle] = useState(1);
    const [phase, setPhase] = useState('work'); // work, shortBreak, longBreak
    const [hasStarted, setHasStarted] = useState(false);
    const [pomodoroTime, setPomodoroTime] = useState(25); // in minutes
    const [shortBreakTime, setShortBreakTime] = useState(5); // in minutes
    const [longBreakTime, setLongBreakTime] = useState(15); // in minutes

    const [isVisible, setIsVisible] = useState(true);
    const [tasks, setTasks] = useState([
        
    ]);
    const [newTask, setNewTask] = useState('');
    const [currentTaskId, setCurrentTaskId] = useState(null); // Store the current task ID

    useEffect(() => {
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

    useEffect(() => {
        if (isActive) {
            // Start hiding animation
            const timer = setTimeout(() => {
                setIsVisible(false); // Hide element after animation completes
            }, 500); // Animation duration 500ms
            return () => clearTimeout(timer);
        } else {
            // Show element immediately before animation starts
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
        }
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const toggleCompleteTask = (id) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
    };

    const handleEditTask = (id) => {
        // Implement edit task functionality here
        console.log(`Edit task ${id}`);
    };

    const selectTaskForSession = (id) => {
        setCurrentTaskId(id);
    };

    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-50">
            <div className="flex items-center">
                {/* Task Popover */}
                <TaskPopover
                    tasks={tasks}
                    setTasks={setTasks} // Pass the setTasks function down to the TaskPopover
                    newTask={newTask}
                    setNewTask={setNewTask}
                    addTask={addTask}
                    deleteTask={deleteTask}
                    toggleCompleteTask={toggleCompleteTask}
                    handleEditTask={handleEditTask}
                    selectTaskForSession={selectTaskForSession}
                    currentTaskId={currentTaskId}
                    isVisible={isVisible}
                    isActive={isActive}
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
                <span className='text-lg text-white'>
                    {currentTaskId
                        ? tasks.find(task => task.id === currentTaskId)?.name
                        : 'No task selected'}
                </span>
            </div>
            {
                phase === 'work' && (
                    <span className="text-sm text-white mt-[8px]">
                        {'Breaks until long break: ' + (4 - cycle)}
                    </span>
                )
            }
        </div >
    );
};

export default PomodoroTimer;
