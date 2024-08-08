import React, { useState } from 'react';
import { Popover, PopoverHandler, PopoverContent, IconButton, Input } from '@material-tailwind/react';
import { BoltIcon, CheckCircleIcon, PencilIcon, TrashIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/react/24/solid';

const TaskPopover = ({
    tasks = [],
    setTasks,
    newTask,
    setNewTask,
    addTask,
    deleteTask,
    toggleCompleteTask,
    selectTaskForSession,
    currentTaskId,
    isActive,
    isVisible
}) => {
    const [isEditing, setIsEditing] = useState(null); 
    const [editTaskName, setEditTaskName] = useState(''); 

    const handlePopoverClick = (event) => {
        event.stopPropagation();
        event.preventDefault();
    };

    const handleEditTask = (task) => {
        setIsEditing(task.id);
        setEditTaskName(task.name);
    };

    const handleEditTaskChange = (e) => {
        setEditTaskName(e.target.value);
    };

    const saveEditedTask = (taskId) => {
        if (editTaskName.trim() === '') return; 
        const updatedTasks = tasks.map(task =>
            task.id === taskId ? { ...task, name: editTaskName } : task
        );
        setTasks(updatedTasks);
        setIsEditing(null); 
        setEditTaskName(''); 
    };

    const handleEditTaskSubmit = (e, taskId) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            saveEditedTask(taskId);
        }
    };

    const handleAddTaskSubmit = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTask();
        }
    };

    return (
        <Popover placement="right" offset={{ mainAxis: 10 }}>
            <PopoverHandler
                className={`flex rounded-full items-center w-[40px] h-[40px] mr-[32px] transition-opacity duration-500 ${isActive ? 'opacity-0' : 'opacity-100'} ${isVisible ? 'visible' : 'invisible'}`}
                onClick={handlePopoverClick}
            >
                <IconButton onClick={handlePopoverClick} variant="text" className="rounded-full w-24 h-24 ml-[32px] transition-opacity duration-500">
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
            <PopoverContent className="w-80 h-auto max-h-96 p-4 bg-gray-700 text-white z-50 flex flex-col">
                <div className="flex-shrink-0">
                    <div className="text-sm font-medium text-white">Tasks</div>
                    <div className="text-xs text-gray-400 mb-2">Add, edit, select for session or delete tasks</div>
                </div>
                <div className="flex-grow overflow-y-auto space-y-2">
                    {tasks.map(task => (
                        <div key={task.id} className={`flex items-center justify-between bg-gray-800 p-2 rounded ${task.id === currentTaskId ? 'border-2 border-blue-500' : ''}`}>
                            <div className="flex items-center space-x-2">
                                <button onClick={() => toggleCompleteTask(task.id)}>
                                    {task.completed ? (
                                        <CheckCircleIconSolid className="w-5 h-5 text-blue-500" />
                                    ) : (
                                        <CheckCircleIcon className="w-5 h-5 text-gray-400" />
                                    )}
                                </button>
                                {isEditing === task.id ? (
                                    <input
                                        type="text"
                                        value={editTaskName}
                                        onChange={handleEditTaskChange}
                                        onKeyDown={(e) => handleEditTaskSubmit(e, task.id)}
                                        className="bg-gray-800 border border-gray-600 rounded-md text-white p-1 w-full"
                                        autoFocus
                                    />
                                ) : (
                                    <span className={task.completed ? 'line-through text-gray-400' : ''}>{task.name}</span>
                                )}
                            </div>
                            <div className="flex items-center space-x-2">
                                <button onClick={() => selectTaskForSession(task.id)}>
                                    <BoltIcon className="w-5 h-5 text-gray-400 hover:text-green-500" />
                                </button>
                                <button onClick={() => handleEditTask(task)}>
                                    <PencilIcon className="w-5 h-5 text-gray-400 hover:text-white" />
                                </button>
                                <button onClick={() => deleteTask(task.id)}>
                                    <TrashIcon className="w-5 h-5 text-gray-400 hover:text-red-500" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex items-center mt-4 pt-2 border-t border-gray-600">
                    <Input
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="I want..."
                        className="bg-gray-800 border border-gray-600 rounded-md text-white p-2 w-full"
                        onKeyDown={handleAddTaskSubmit}
                    />
                    <button onClick={addTask} className="ml-2 text-blue-500 hover:text-blue-700">
                        <PlusCircleIcon className="w-6 h-6" />
                    </button>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default TaskPopover;
