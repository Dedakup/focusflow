import React, { useState, useEffect } from 'react';
import TimerCircle from './TimerCircle';
import SettingsPopover from './SettingsPopover';
import TaskPopover from './TaskPopover';
import { Alert } from "@material-tailwind/react";

const PomodoroTimer = () => {
    const initialRadius = 115;
    const expandedRadius = 175;

    const defaultPomodoroTime = 25; 
    const defaultShortBreakTime = 5;
    const defaultLongBreakTime = 15;

    const [radius, setRadius] = useState(initialRadius);
    const [timeLeft, setTimeLeft] = useState(null); 
    const [isActive, setIsActive] = useState(false);
    const [cycle, setCycle] = useState(1);
    const [phase, setPhase] = useState('work');
    const [hasStarted, setHasStarted] = useState(false);
    const [pomodoroTime, setPomodoroTime] = useState(null);
    const [shortBreakTime, setShortBreakTime] = useState(null);
    const [longBreakTime, setLongBreakTime] = useState(null);

    const [isVisible, setIsVisible] = useState(true);
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [currentTaskId, setCurrentTaskId] = useState(null); 
    const [notificationMessage, setNotificationMessage] = useState(null);

    useEffect(() => {
        const storedTasks = JSON.parse(window.localStorage.getItem('tasks'));
        const storedSettings = JSON.parse(window.localStorage.getItem('pomodoroSettings'));
        const storedCurrentTaskId = JSON.parse(window.localStorage.getItem('currentTaskId'));

        if (storedTasks) {
            setTasks(storedTasks);
        }

        if (storedSettings) {
            setPomodoroTime(storedSettings.pomodoroTime || defaultPomodoroTime);
            setShortBreakTime(storedSettings.shortBreakTime || defaultShortBreakTime);
            setLongBreakTime(storedSettings.longBreakTime || defaultLongBreakTime);
            setTimeLeft((storedSettings.pomodoroTime || defaultPomodoroTime) * 60); 
        } else {
            setPomodoroTime(defaultPomodoroTime);
            setShortBreakTime(defaultShortBreakTime);
            setLongBreakTime(defaultLongBreakTime);
            setTimeLeft(defaultPomodoroTime * 60);
        }

        if (storedCurrentTaskId !== null) {
            setCurrentTaskId(storedCurrentTaskId);
        }
    }, []);

    useEffect(() => {
        if (tasks.length > 0) {
            window.localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }, [tasks]);

    useEffect(() => {
        if (pomodoroTime !== null && shortBreakTime !== null && longBreakTime !== null) {
            const settings = {
                pomodoroTime,
                shortBreakTime,
                longBreakTime,
            };
            window.localStorage.setItem('pomodoroSettings', JSON.stringify(settings));
        }
    }, [pomodoroTime, shortBreakTime, longBreakTime]);

    useEffect(() => {
        if (currentTaskId !== null) {
            window.localStorage.setItem('currentTaskId', JSON.stringify(currentTaskId));
        }
    }, [currentTaskId]);

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
                setTimeLeft(shortBreakTime * 60);
                setCycle(cycle + 1);
            } else {
                setPhase('longBreak');
                setTimeLeft(longBreakTime * 60);
                setCycle(1);
            }
        } else {
            setPhase('work');
            setTimeLeft(pomodoroTime * 60);
        }
        setIsActive(true);
        showNotification();
    };

    const showNotification = () => {
        if (Notification.permission === 'granted') {
            let notificationMessage = phase === 'work' ? 'Time to take a break!' : 'Break is over! Time to get back to work!';

            new Notification('Pomodoro Timer', {
                body: notificationMessage,
            });
        }
    };

    const requestNotificationPermission = () => {
        if (Notification.permission === "denied") {
            setNotificationMessage("Notifications are blocked. Please enable them in your browser settings.");
        } else if (Notification.permission !== "granted") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    setNotificationMessage("Notifications are enabled. You'll receive notifications when the timer ends.");
                } else {
                    setNotificationMessage("Notifications are blocked. Please enable them in your browser settings.");
                }
            });
        }
    };

    const toggleTimer = () => {
        if (!hasStarted) {
            setHasStarted(true);
            requestNotificationPermission(); 
        }
        setIsActive(!isActive);
        setRadius(isActive ? initialRadius : expandedRadius);
    };

    const resetTimer = (event) => {
        event.stopPropagation();
        setTimeLeft(pomodoroTime * 60);
        setIsActive(false);
        setPhase('work');
        setCycle(1);
        setHasStarted(false);
        setRadius(initialRadius);
    };

    useEffect(() => {
        if (isActive) {
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 500);
            return () => clearTimeout(timer);
        } else {
            setIsVisible(true);
        }
    }, [isActive]);

    useEffect(() => {
        if (notificationMessage) {
            const timer = setTimeout(() => {
                setNotificationMessage(null);
            }, 10000); // Убираем сообщение через 10 секунд
            return () => clearTimeout(timer);
        }
    }, [notificationMessage]);

    const handlePomodoroChange = (e) => {
        const newTime = parseInt(e.target.value);
        setPomodoroTime(newTime);
        if (phase === 'work') {
            setTimeLeft(newTime * 60);
        }
    };

    const handleShortBreakChange = (e) => {
        setShortBreakTime(parseInt(e.target.value));
    };

    const handleLongBreakChange = (e) => {
        setLongBreakTime(parseInt(e.target.value));
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
        console.log(`Edit task ${id}`);
    };

    const selectTaskForSession = (id) => {
        setCurrentTaskId(id);
    };

    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-50">
            {notificationMessage && (
                <Alert
                    color="red"
                    onClose={() => setNotificationMessage(null)}
                    className="fixed top-4 right-4 w-1/3"
                >
                    {notificationMessage}
                </Alert>
            )}
            <div className="flex items-center">
                <TaskPopover
                    tasks={tasks}
                    setTasks={setTasks}
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
                <TimerCircle
                    radius={radius}
                    timeLeft={timeLeft}
                    isActive={isActive}
                    toggleTimer={toggleTimer}
                    resetTimer={resetTimer}
                    phase={phase}
                    hasStarted={hasStarted}
                />
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
