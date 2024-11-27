import React from 'react';
import {
    Popover,
    PopoverHandler,
    PopoverContent,
    IconButton,
} from '@material-tailwind/react';

const SettingsPopover = ({
    isVisible,
    isActive,
    handlePomodoroChange,
    handleShortBreakChange,
    handleLongBreakChange,
    pomodoroTime,
    shortBreakTime,
    longBreakTime,
}) => {
    const handlePopoverClick = (event) => {
        event.stopPropagation();
        event.preventDefault();
    };

    return (
        <Popover placement="left" offset={{ mainAxis: 10 }}>
            <PopoverHandler
                className={`flex rounded-full items-center w-[40px] h-[40px] ml-[32px] transition-opacity duration-500 ${isActive ? 'opacity-0' : 'opacity-100'} ${isVisible ? 'visible' : 'invisible'}`}
                onClick={handlePopoverClick}
            >
                <IconButton
                    onClick={handlePopoverClick}
                    variant="text"
                    className={`rounded-full w-24 h-24 transition-opacity duration-200 ${isActive ? 'opacity-0' : 'opacity-100'}`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 text-white"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                    </svg>
                </IconButton>
            </PopoverHandler>
            <PopoverContent className="w-80 h-auto p-4 bg-gray-700 text-white z-50">
                <div className="flex flex-col space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-white">
                            Pomodoro
                        </label>
                        <input
                            type="number"
                            value={pomodoroTime}
                            onChange={handlePomodoroChange}
                            className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white">
                            Short break
                        </label>
                        <input
                            type="number"
                            value={shortBreakTime}
                            onChange={handleShortBreakChange}
                            className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white">
                            Long break
                        </label>
                        <input
                            type="number"
                            value={longBreakTime}
                            onChange={handleLongBreakChange}
                            className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default SettingsPopover;
