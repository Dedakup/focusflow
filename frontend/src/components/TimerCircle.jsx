import React from 'react';

const TimerCircle = ({ radius, timeLeft, isActive, toggleTimer, resetTimer, phase, hasStarted }) => {
    const numLines = 25;
    const lines = Array.from({ length: numLines }, (_, index) => {
        const angle = (index * 360) / numLines;
        const progressIndex = Math.floor(((1500 - timeLeft) / 1500) * numLines); 
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

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div
            className={`relative flex items-center justify-center transition-all duration-500 cursor-pointer ${isActive ? 'transform -translate-y-10' : ''}`}
            style={{ width: `${radius * 2}px`, height: `${radius * 2}px` }}
            onClick={toggleTimer}
        >
            {lines}
            <div className="absolute flex flex-col items-center">
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
    );
};

export default TimerCircle;
