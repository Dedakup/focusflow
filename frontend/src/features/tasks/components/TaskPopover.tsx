/**
 * @file TaskPopover.jsx
 * @description This component renders a popover for managing tasks in the FocusFlow application.
 * It allows users to view, add, edit, delete, and toggle the completion status of tasks.
 *
 * @requires React
 * @requires @material-tailwind/react
 * @requires @heroicons/react
 * @requires react-toastify
 * @requires @auth0/auth0-react
 */

import React, { useState, useEffect } from 'react';
import {
    Popover,
    PopoverHandler,
    PopoverContent,
    IconButton,
    Input,
} from '@material-tailwind/react';
import {
    CheckCircleIcon,
    PencilIcon,
    TrashIcon,
    PlusCircleIcon,
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/react/24/solid';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../config/config';
import { useAuth0 } from '@auth0/auth0-react';
import PropTypes from 'prop-types';
import SkeletonLoader from './skeletons/SkeletonLoader';

/**
 * TaskPopover Component
 *
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.isActive - Indicates if the component is active
 * @param {boolean} props.isVisible - Indicates if the component is visible
 * @returns {React.Component} TaskPopover component
 */
const TaskPopover = ({ isActive, isVisible }) => {
    // State declarations
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [isEditing, setIsEditing] = useState(null);
    const [editTaskName, setEditTaskName] = useState('');
    const { getAccessTokenSilently, user } = useAuth0();
    const [isLoading, setIsLoading] = useState(false);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [shouldRefetch, setShouldRefetch] = useState(true);

    const handlePopoverClose = () => {
        setIsPopoverOpen(false); // Close the popover
        setIsEditing(null); // Reset the editing state
        setEditTaskName(''); // Clear the task name input
    };

    /**
     * Fetches tasks from the API
     *
     * @async
     * @function fetchTasks
     * @throws {Error} When the API request fails
     */
    const fetchTasks = async () => {
        if (!user?.sub) {
            console.error('User ID is undefined');
            toast.error('Unable to fetch tasks: User not authenticated');
            return;
        }

        setIsLoading(true);
        try {
            const token = await getAccessTokenSilently({
                audience: 'focusflow-audience',
            });

            //get tasks send userid and token
            const response = await fetch(
                `${API_BASE_URL}/tasks?userId=${user.sub}`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                },
            );

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            const data = await response.json();
            setTasks(data);
            console.log(data);
        } catch (err) {
            console.error('Error fetching tasks:', err);
            toast.error('Failed to load tasks');
        } finally {
            setIsLoading(false);
        }
    };

    // Request new task data only when following params change
    useEffect(() => {
        if (isPopoverOpen && user?.sub && shouldRefetch) {
            fetchTasks();
            setShouldRefetch(false);
        }
    }, [isPopoverOpen, user?.sub, shouldRefetch]);

    /**
     * Handles adding a new task
     *
     * @async
     * @function handleAddTask
     * @throws {Error} When the API request fails
     */
    const handleAddTask = async () => {
        //check user
        if (!user?.sub) {
            toast.error('User not authenticated');
            return;
        }
        //check if task empty
        if (newTask.trim() === '') {
            toast.warn('Task name cannot be empty');
            return;
        }

        //task value to add it imidietly into ui until db load
        const tempTaskId = crypto.randomUUID();

        // Add task to local state immediately
        const tempTask = {
            taskId: tempTaskId,
            title: newTask,
            status: 'pending',
            userId: user.sub,
        };
        setTasks((prev) => [...prev, tempTask]);
        setNewTask('');

        //send task to the server
        try {
            //get token
            const token = await getAccessTokenSilently({
                audience: 'focusflow-audience',
            });
            //send add request with token and tasks body
            const response = await fetch(`${API_BASE_URL}/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    userId: user.sub,
                    taskId: tempTaskId,
                    title: newTask,
                    description: 'Optional description',
                    dueDate: new Date().toISOString(),
                }),
            });

            if (!response.ok) {
                // Remove the temporary task if the API call fails
                setTasks((prev) =>
                    prev.filter((task) => task.taskId !== tempTaskId),
                );
                const errorData = await response.json();
                toast.error(
                    `Failed to add task: ${errorData.message || 'Unknown error'}`,
                );
            }
        } catch (error) {
            // Remove the temporary task if the API call fails
            setTasks((prev) =>
                prev.filter((task) => task.taskId !== tempTaskId),
            );
            console.error('Error adding task:', error);
            toast.error('Failed to add task. Please try again.');
        }
    };

    /**
     * Handles deleting a task
     *
     * @async
     * @function handleDeleteTask
     * @param {string} taskId - ID of the task to delete
     * @throws {Error} When the API request fails
     */

    const handleDeleteTask = async (taskId) => {
        const previousTasks = [...tasks]; // Save current state
        setTasks((prevTasks) =>
            prevTasks.filter((task) => task.taskId !== taskId),
        ); // Optimistic update

        try {
            const token = await getAccessTokenSilently({
                audience: 'focusflow-audience',
            });
            const userId = user?.sub; // Retrieve the authenticated user's ID

            if (!userId) {
                throw new Error('User not authenticated');
            }

            const response = await fetch(
                `${API_BASE_URL}/tasks/${taskId}?userId=${userId}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            if (!response.ok) {
                const errorDetails = await response.text();
                console.error('API Error Response:', errorDetails);
                throw new Error('Failed to delete task');
            }

            toast.success('Task deleted successfully');
        } catch (error) {
            console.error('Error deleting task:', error);
            setTasks(previousTasks); // Revert to previous state
            toast.error('Failed to delete task. Please try again.');
        }
    };

    /**
     * Toggles the completion status of a task
     *
     * @async
     * @function toggleCompleteTask
     * @param {string} taskId - ID of the task to toggle
     * @throws {Error} When the API request fails
     */
    const toggleCompleteTask = async (taskId) => {
        const taskToToggle = tasks.find((task) => task.taskId === taskId);
        if (!taskToToggle) return;

        await handleUpdateTask(taskId, {
            status:
                taskToToggle.status === 'completed' ? 'pending' : 'completed',
        });
    };

    /**
     * Handles updating a task
     *
     * @async
     * @function handleUpdateTask
     * @param {string} taskId - ID of the task to update
     * @param {Object} updatedFields - Fields to update (e.g., title, status)
     * @throws {Error} When the API request fails
     */
    const handleUpdateTask = async (taskId, updatedFields) => {
        const previousTasks = [...tasks];

        // Optimistically update the local state with the updated fields
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.taskId === taskId ? { ...task, ...updatedFields } : task,
            ),
        );

        try {
            const token = await getAccessTokenSilently({
                audience: 'focusflow-audience',
            });

            const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    taskId,
                    userId: user.sub, // Ensure userId is sent
                    ...updatedFields, // Send only fields that need to be updated
                }),
            });

            if (!response.ok) {
                const errorDetails = await response.json();
                console.error('API Error Response:', errorDetails);
                throw new Error(errorDetails.error || 'Failed to update task');
            }

            // Merge API response with the existing task data
            const { updatedTask } = await response.json();

            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.taskId === taskId ? { ...task, ...updatedTask } : task,
                ),
            );
            toast.success('Task updated successfully');
        } catch (error) {
            console.error('Error updating task:', error);
            setTasks(previousTasks); // Revert to previous state if API call fails
            toast.error('Failed to update task. Please try again.');
        }
    };

    /**
     * Handles the submission of a new task
     *
     * @function handleAddTaskSubmit
     * @param {Event} e - Keydown event
     */
    const handleAddTaskSubmit = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTask();
        }
    };

    // Reset editing state when popover closes
    useEffect(() => {
        if (!isPopoverOpen) {
            setIsEditing(null);
        }
    }, [isPopoverOpen]);

    return (
        <Popover
            placement="right"
            offset={{ mainAxis: 10 }}
            open={isPopoverOpen}
            handler={setIsPopoverOpen}
            onClose={handlePopoverClose} // Reset state when the popover closes
        >
            <PopoverHandler
                className={`flex rounded-full items-center w-[40px] h-[40px] mr-[32px] transition-opacity duration-500 ${
                    isActive ? 'opacity-0' : 'opacity-100'
                } ${isVisible ? 'visible' : 'invisible'}`}
            >
                <IconButton
                    variant="text"
                    className="rounded-full w-24 h-24 ml-[32px] transition-opacity duration-500"
                >
                    <PlusCircleIcon className="w-6 h-6 text-white" />
                </IconButton>
            </PopoverHandler>
            {isPopoverOpen && (
                <PopoverContent className="w-80 h-auto max-h-96 p-4 bg-gray-700 text-white z-50 flex flex-col">
                    <div className="text-sm font-medium text-white flex justify-between">
                        <span>Tasks</span>
                        <button onClick={() => fetchTasks()}>Reload</button>
                        <IconButton
                            onClick={() => setIsPopoverOpen(false)}
                            variant="text"
                            className="rounded-full w-24 h-24 ml-[32px] transition-opacity duration-500"
                        >
                            <PlusCircleIcon className="w-6 h-6 text-white" />
                        </IconButton>
                    </div>

                    <div className="flex-grow overflow-y-auto space-y-2">
                        {isLoading ? (
                            <SkeletonLoader rows={5} />
                        ) : tasks.length === 0 ? ( //if there is 0 tasks
                            <div className="text-center text-gray-400">
                                No tasks available
                            </div>
                        ) : (
                            //rendering tasks
                            tasks.map((task) => (
                                <div
                                    key={task.taskId}
                                    className="flex items-center justify-between"
                                >
                                    <button
                                        onClick={() =>
                                            toggleCompleteTask(task.taskId)
                                        }
                                    >
                                        {task.status === 'completed' ? (
                                            <CheckCircleIconSolid className="w-5 h-5 text-blue-500" />
                                        ) : (
                                            <CheckCircleIcon className="w-5 h-5 text-gray-400" />
                                        )}
                                    </button>
                                    {isEditing === task.taskId ? (
                                        <input
                                            type="text"
                                            value={editTaskName}
                                            onChange={(e) =>
                                                setEditTaskName(e.target.value)
                                            }
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    handleUpdateTask(
                                                        task.taskId,
                                                        {
                                                            title: editTaskName,
                                                        },
                                                    );
                                                    setIsEditing(null);
                                                }
                                            }}
                                            autoFocus
                                            className="flex-1 bg-gray-600 text-white px-2 py-1 rounded"
                                        />
                                    ) : (
                                        <span
                                            onDoubleClick={() => {
                                                setIsEditing(task.taskId);
                                                setEditTaskName(task.title);
                                            }}
                                            className="text-gray-200 flex-1 truncate cursor-pointer"
                                        >
                                            {task.title}
                                        </span>
                                    )}
                                    <button
                                        onClick={() => {
                                            setIsEditing(task.taskId);
                                            setEditTaskName(task.title);
                                        }}
                                    >
                                        <PencilIcon className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDeleteTask(task.taskId)
                                        }
                                    >
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="flex items-center mt-4">
                        <Input
                            type="text"
                            placeholder="Add a new task"
                            className="text-white"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            onKeyDown={handleAddTaskSubmit}
                        />
                        <button onClick={handleAddTask}>
                            <PlusCircleIcon className="w-6 h-6" />
                        </button>
                    </div>
                </PopoverContent>
            )}
        </Popover>
    );
};

TaskPopover.propTypes = {
    isActive: PropTypes.bool.isRequired,
    isVisible: PropTypes.bool.isRequired,
};

export default TaskPopover;
