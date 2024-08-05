import React, { useState, useEffect } from 'react';
import {
    IconButton,
    Button,
    Popover,
    PopoverHandler,
    PopoverContent,

} from '@material-tailwind/react';

const PomodoroTimer = () => {
    const numLines = 25;
    const initialRadius = 115;
    const expandedRadius = 175;
    const totalTime = 1500; // 25 minutes in seconds for work timer

    const [radius, setRadius] = useState(initialRadius);
    const [timeLeft, setTimeLeft] = useState(totalTime);
    const [isActive, setIsActive] = useState(false);
    const [cycle, setCycle] = useState(1);
    const [phase, setPhase] = useState('work'); // work, shortBreak, longBreak
    const [hasStarted, setHasStarted] = useState(false);

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
                setTimeLeft(300); // 5 minutes in seconds
                setCycle(cycle + 1);
            } else {
                setPhase('longBreak');
                setTimeLeft(900); // 15 minutes in seconds
                setCycle(1);
            }
        } else {
            setPhase('work');
            setTimeLeft(totalTime); // 25 minutes in seconds
        }
        setIsActive(true);
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const lines = Array.from({ length: numLines }, (_, index) => {
        const angle = (index * 360) / numLines;
        const progressIndex = Math.floor(((totalTime - timeLeft) / totalTime) * numLines);
        const isLineActive = index < progressIndex;
        const lineWidth = isActive ? '8px' : '4px';
        const lineHeight = isActive ? '20px' : '10px';
        const style = {
            transform: `rotate(${angle}deg) translateY(-${radius}px)`,
            transformOrigin: 'center',
            opacity: isLineActive ? '0' : '1',
            width: lineWidth,
            height: lineHeight,
        };
        return <div key={index} className="absolute bg-white rounded-full transition-all duration-500" style={style} />;
    });

    const toggleTimer = () => {
        if (!hasStarted) setHasStarted(true);
        setIsActive(!isActive);
        setRadius(isActive ? initialRadius : expandedRadius);
    };

    const resetTimer = (event) => {
        event.stopPropagation(); // Prevent the timer from starting
        setTimeLeft(totalTime);
        setIsActive(false);
        setPhase('work');
        setCycle(1);
        setHasStarted(false);
        setRadius(initialRadius); // Reset radius to initial
    };

    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (isActive) {
            // Начинаем анимацию исчезновения
            const timer = setTimeout(() => {
                setIsVisible(false); // Скрываем элемент после завершения анимации
            }, 500); // Длительность анимации 500ms
            return () => clearTimeout(timer);
        } else {
            // Показываем элемент сразу перед началом анимации появления
            setIsVisible(true);
        }
    }, [isActive]);
    
    const handlePopoverClick = (event) => {
        event.stopPropagation();
        event.preventDefault();
    };

    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-50 ">
            {/* Timer Section */}
            <div className="flex items-center">
                <Popover
                    placement="right"
                    offset={{ mainAxis: 10 }}
                >
                    <PopoverHandler
                        className={`flex rounded-full items-center w-[40px] h-[40px] mr-[32px] transition-opacity duration-500 ${isActive ? 'opacity-0' : 'opacity-100'} ${isVisible ? 'visible' : 'invisible'}`}
                        onClick={handlePopoverClick}
                    >

                        <IconButton onClick={handlePopoverClick} variant="text" className={`rounded-full w-24 h-24 transition-opacity duration-200 ${isActive ? 'opacity-0' : 'opacity-100'}`}>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="white"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                width="24"
                                height="24"
                                className='text-white'
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                />
                            </svg>

                        </IconButton>
                    </PopoverHandler>
                    <PopoverContent className={`w-[393px] h-36 p-4 bg-gray-700 text-white z-50`}>
                        <div className="w-full">
                            {/* Add your content here */}
                        </div>
                    </PopoverContent>
                </Popover>

                {/* Timer Pomodoro */}
                <div
                    className={`relative flex items-center justify-center transition-all duration-500 cursor-pointer ${isActive ? 'transform -translate-y-10' : ''}`}
                    style={{ width: `${radius * 2}px`, height: `${radius * 2}px` }}
                    onClick={toggleTimer}
                >
                    {lines}
                    <div className="absolute flex flex-col items-center">
                        {/* Show Lightning or Tea Cup Icon */}
                        <div className={`mb-4 transition-all duration-500 ${isActive ? 'transform -translate-y-[40px]' : ''}`}>
                            {phase === 'work' && isActive ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 28" strokeWidth="2.5" stroke="currentColor" className="size-8 text-yellow-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            ) : hasStarted && !isActive ? (
                                <svg strokeWidth="2.5" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className='mb-2'>
                                    <g clipPath="url(#clip0_24_4693)">
                                        <path d="M21 9.33317H22.1667C23.4043 9.33317 24.5913 9.82484 25.4665 10.7C26.3417 11.5752 26.8333 12.7622 26.8333 13.9998C26.8333 15.2375 26.3417 16.4245 25.4665 17.2997C24.5913 18.1748 23.4043 18.6665 22.1667 18.6665H21M21 9.33317H2.33333V19.8332C2.33333 21.0708 2.82499 22.2578 3.70016 23.133C4.57533 24.0082 5.76232 24.4998 6.99999 24.4998H16.3333C17.571 24.4998 18.758 24.0082 19.6332 23.133C20.5083 22.2578 21 21.0708 21 19.8332V9.33317ZM6.99999 1.1665V4.6665M11.6667 1.1665V4.6665M16.3333 1.1665V4.6665" stroke="#F3F3F3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_24_4693">
                                            <rect width="28" height="28" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            ) : null}
                        </div>
                        <span className={`text-white transition-all duration-500 ${isActive ? 'text-6xl' : 'text-4xl'}`}>{formatTime(timeLeft)}</span>
                        {/* Restart Button */}
                        {hasStarted && !isActive && (
                            <button
                                className="mt-6 text-white rounded-full"
                                onClick={resetTimer}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                                </svg>

                            </button>
                        )}
                    </div>
                </div>
                {/* Pomodoro Settings Button */}

                <Popover
                    placement="left"
                    offset={{ mainAxis: 10 }}
                >
                    <PopoverHandler
                        className={`flex rounded-full items-center w-[40px] h-[40px] ml-[32px] transition-opacity duration-500 ${isActive ? 'opacity-0' : 'opacity-100'} ${isVisible ? 'visible' : 'invisible'}`}
                        onClick={handlePopoverClick}
                    >

                        <IconButton onClick={handlePopoverClick} variant="text" className={`rounded-full w-24 h-24 ml-[32px] transition-opacity duration-500 ${isActive ? 'opacity-0' : 'opacity-100'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>

                        </IconButton>
                    </PopoverHandler>
                    <PopoverContent className={`w-[393px] h-36 p-4 bg-gray-700 text-white z-50`}>
                        <div className="w-full">
                            {/* Add your content here */}
                        </div>
                    </PopoverContent>
                </Popover>
            </div>

            {/* Current Task Section */}
            <span className='text-lg text-white mt-[32px]'>{'Current task'}</span>
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
