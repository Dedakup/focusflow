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

import React, { useState, useEffect } from "react";
import {
    Popover,
    PopoverHandler,
    PopoverContent,
    IconButton,
    Input,
} from "@material-tailwind/react";
import {
    CheckCircleIcon,
    PencilIcon,
    TrashIcon,
    PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleIconSolid } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../config/config";
import { useAuth0 } from '@auth0/auth0-react';
import PropTypes from 'prop-types';

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
    const [newTask, setNewTask] = useState("");
    const [isEditing, setIsEditing] = useState(null);
    const [editTaskName, setEditTaskName] = useState("");
    const { getAccessTokenSilently, user } = useAuth0();
    const [isLoading, setIsLoading] = useState(false);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [shouldRefetch, setShouldRefetch] = useState(true);

    /**
     * Fetches tasks from the API
     * 
     * @async
     * @function fetchTasks
     * @throws {Error} When the API request fails
     */
    const fetchTasks = async () => {
        if (!user?.sub) {
            console.error("User ID is undefined");
            toast.error("Unable to fetch tasks: User not authenticated");
            return;
        }

        setIsLoading(true);
        try {
            const token = await getAccessTokenSilently({ audience: "focusflow-audience" });

            const response = await fetch(`${API_BASE_URL}/tasks?userId=${user.sub}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            const data = await response.json();
            setTasks(data);
            console.log(data);
        } catch (err) {
            console.error("Error fetching tasks:", err);
            toast.error("Failed to load tasks");
        } finally {
            setIsLoading(false);
        }
    };

    // Effect hooks
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
        if (newTask.trim() === "") {
            toast.warn("Task name cannot be empty");
            return;
        }

        try {
            const token = await getAccessTokenSilently({ audience: "focusflow-audience" });

            const response = await fetch(`${API_BASE_URL}/tasks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    userId: user.sub,
                    taskId: crypto.randomUUID(),
                    title: newTask,
                    description: "Optional description",
                    dueDate: new Date().toISOString(),
                }),
            });

            if (response.ok) {
                const createdTask = await response.json();
                setTasks((prev) => [...prev, createdTask]);
                setNewTask("");
                setShouldRefetch(true);
                toast.success("Task added successfully");
            } else {
                const errorData = await response.json();
                toast.error(`Failed to add task: ${errorData.message || "Unknown error"}`);
            }
        } catch (error) {
            console.error("Error adding task:", error);
            toast.error("Failed to add task. Please try again.");
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
        try {
            const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setTasks((prev) => prev.filter((task) => task.id !== taskId));
                toast.success("Task deleted successfully");
            } else {
                toast.error("Failed to delete task");
            }
        } catch (error) {
            toast.error("Failed to delete task");
            console.error("Error deleting task:", error);
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
        const taskToToggle = tasks.find((task) => task.id === taskId);
        if (!taskToToggle) return;

        try {
            const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ completed: !taskToToggle.completed }),
            });

            if (response.ok) {
                const updatedTask = await response.json();
                setTasks((prev) =>
                    prev.map((task) => (task.id === taskId ? updatedTask : task))
                );
                toast.success("Task updated successfully");
            } else {
                toast.error("Failed to update task");
            }
        } catch (error) {
            toast.error("Failed to update task");
            console.error("Error updating task:", error);
        }
    };

    /**
     * Handles editing a task
     * 
     * @function handleEditTask
     * @param {Object} task - Task object to edit
     */
    const handleEditTask = (task) => {
        setIsEditing(task.id);
        setEditTaskName(task.name);
    };

    /**
     * Handles changes in the edit task input
     * 
     * @function handleEditTaskChange
     * @param {Event} e - Input change event
     */
    const handleEditTaskChange = (e) => {
        setEditTaskName(e.target.value);
    };

    /**
     * Saves the edited task
     * 
     * @async
     * @function saveEditedTask
     * @param {string} taskId - ID of the task being edited
     * @throws {Error} When the API request fails
     */
    const saveEditedTask = async (taskId) => {
        if (editTaskName.trim() === "") return;

        try {
            const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: editTaskName }),
            });

            if (response.ok) {
                const updatedTask = await response.json();
                setTasks((prev) =>
                    prev.map((task) => (task.id === taskId ? updatedTask : task))
                );
                setIsEditing(null);
                setEditTaskName("");
                setShouldRefetch(true);
                toast.success("Task updated successfully");
            } else {
                toast.error("Failed to update task");
            }
        } catch (error) {
            toast.error("Failed to update task");
            console.error("Error updating task:", error);
        }
    };

    /**
     * Handles the submission of an edited task
     * 
     * @function handleEditTaskSubmit
     * @param {Event} e - Keydown event
     * @param {string} taskId - ID of the task being edited
     */
    const handleEditTaskSubmit = (e, taskId) => {
        if (e.key === "Enter") {
            e.preventDefault();
            saveEditedTask(taskId);
        }
    };

    /**
     * Handles the submission of a new task
     * 
     * @function handleAddTaskSubmit
     * @param {Event} e - Keydown event
     */
    const handleAddTaskSubmit = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAddTask();
        }
    };

    return (
        <Popover
            placement="right"
            offset={{ mainAxis: 10 }}
            open={isPopoverOpen}
            handler={setIsPopoverOpen}
        >
            <PopoverHandler
                className={`flex rounded-full items-center w-[40px] h-[40px] mr-[32px] transition-opacity duration-500 ${isActive ? "opacity-0" : "opacity-100"
                    } ${isVisible ? "visible" : "invisible"}`}
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
                            <div className="flex justify-center items-center h-full">
                                <div>Loading tasks...</div>
                            </div>
                        ) : tasks.length === 0 ? (
                            <div className="text-center text-gray-400">No tasks available</div>
                        ) : (
                            tasks.map((task) => (
                                <div key={task.taskId} className="flex items-center justify-between">
                                    <button onClick={() => toggleCompleteTask(task.taskId)}>
                                        {task.status === "completed" ? (
                                            <CheckCircleIconSolid className="w-5 h-5 text-blue-500" />
                                        ) : (
                                            <CheckCircleIcon className="w-5 h-5 text-gray-400" />
                                        )}
                                    </button>
                                    {isEditing === task.taskId ? (
                                        <input
                                            type="text"
                                            value={editTaskName}
                                            onChange={handleEditTaskChange}
                                            onKeyDown={(e) => handleEditTaskSubmit(e, task.taskId)}
                                            autoFocus
                                            className="flex-1 bg-gray-600 text-white"
                                        />
                                    ) : (
                                        <span className="text-gray-200 flex-1 truncate">{task.title}</span>
                                    )}
                                    <button onClick={() => handleEditTask(task)}>
                                        <PencilIcon className="w-5 h-5" />
                                    </button>
                                    <button onClick={() => handleDeleteTask(task.taskId)}>
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
    isVisible: PropTypes.bool.isRequired
};

export default TaskPopover;
