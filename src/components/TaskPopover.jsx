import React from 'react';
import { Popover, PopoverHandler, PopoverContent, IconButton, Input } from '@material-tailwind/react';

const TaskPopover = ({ tasks, newTask, setNewTask, addTask, deleteTask, toggleCompleteTask, handleEditTask, isVisible, isActive }) => {
    const handlePopoverClick = (event) => {
        event.stopPropagation();
        event.preventDefault();
    };

    return (
        <Popover placement="right" offset={{ mainAxis: 10 }}>
            <PopoverHandler
                className={`flex rounded-full items-center w-[40px] h-[40px] mr-[32px] transition-opacity duration-500 ${isActive ? 'opacity-0' : 'opacity-100'} ${isVisible ? 'visible' : 'invisible'}`}
                onClick={handlePopoverClick}
            >
                <IconButton onClick={handlePopoverClick} variant="text" className={`rounded-full w-24 h-24 ml-[32px] transition-opacity duration-500 ${isActive ? 'opacity-0' : 'opacity-100'}`}>
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
            <PopoverContent className="w-80 h-auto p-4 bg-gray-700 text-white z-50">
                <div className="flex flex-col space-y-2">
                    <div className="text-sm font-medium text-white">Tasks</div>
                    <div className="text-xs text-gray-400 mb-2">Add, edit, select for session or delete tasks</div>
                    <div className="space-y-2">
                        {tasks.map(task => (
                            <div key={task.id} className="flex items-center justify-between bg-gray-800 p-2 rounded">
                                <div className="flex items-center space-x-2">
                                    <button onClick={() => toggleCompleteTask(task.id)}>
                                        {task.completed ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className="w-5 h-5 text-blue-500">
                                                <path d="M16 2.667L5.833 14 0 8.167l1.666-1.666 4.167 4.167L14.333 1 16 2.667z" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m15 0c0-4.142-3.358-7.5-7.5-7.5S4.5 7.858 4.5 12s3.358 7.5 7.5 7.5 7.5-3.358 7.5-7.5zm0 0H8.25" />
                                            </svg>
                                        )}
                                    </button>
                                    <span className={task.completed ? 'line-through text-gray-400' : ''}>{task.name}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button onClick={() => handleEditTask(task.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 hover:text-white">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-3.536-3.536L7.768 13.464a2.25 2.25 0 00-.618 1.414V18h3.121a2.25 2.25 0 001.414-.618l6.464-6.464a2.25 2.25 0 00-3.182-3.182z" />
                                        </svg>
                                    </button>
                                    <button onClick={() => deleteTask(task.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 hover:text-red-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 6h-15m3 0v12a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 18V6m-12 0V4.5A1.5 1.5 0 017.5 3h9A1.5 1.5 0 0118 4.5V6m-6 4.5v6m-3-6v6m6-6v6" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center mt-4">
                        <Input
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            placeholder="I want..."
                            className="bg-gray-800 border border-gray-600 rounded-md text-white p-2 w-full"
                        />
                        <button onClick={addTask} className="ml-2 text-blue-500 hover:text-blue-700">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default TaskPopover;
