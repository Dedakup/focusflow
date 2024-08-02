import React, { useState, useEffect } from 'react';

const PomodoroTimer = () => {
    const numLines = 25;
    const initialRadius = 115;
    const expandedRadius = 184;
    const totalTime = 1500; // 25 минут в секундах для рабочего таймера

    const [radius, setRadius] = useState(initialRadius);
    const [timeLeft, setTimeLeft] = useState(totalTime);
    const [isActive, setIsActive] = useState(false);
    const [cycle, setCycle] = useState(1);
    const [phase, setPhase] = useState('work'); // work, shortBreak, longBreak

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
                setTimeLeft(300); // 5 минут в секундах
                setCycle(cycle + 1);
            } else {
                setPhase('longBreak');
                setTimeLeft(900); // 15 минут в секундах
                setCycle(1);
            }
        } else {
            setPhase('work');
            setTimeLeft(totalTime); // 25 минут в секундах
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
        return <div key={index} className="absolute bg-slate-300 rounded-full transition-all duration-500" style={style} />;
    });

    const toggleTimer = () => {
        setIsActive(!isActive);
        setRadius(isActive ? initialRadius : expandedRadius);
    };

    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <div 
                className={`relative flex items-center justify-center transition-all duration-500 cursor-pointer`} 
                style={{ width: `${radius * 2}px`, height: `${radius * 2}px` }}
                onClick={toggleTimer}
            >
                {lines}
                <div className="absolute">
                    <span className="text-4xl text-slate-300">{formatTime(timeLeft)}</span>
                </div>
            </div>
        </div>
    );
};

export default PomodoroTimer;
