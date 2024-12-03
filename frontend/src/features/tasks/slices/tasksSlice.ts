import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE_URL } from '@config/config';

interface Task {
    taskId: string;
    title: string;
    status: 'pending' | 'completed';
    userId: string;
}

interface TasksState {
    tasks: Task[];
    isLoading: boolean;
    error: string | null;
}

const initialState: TasksState = {
    tasks: [],
    isLoading: false,
    error: null,
};

// Async thunks
export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async ({ userId, token }: { userId: string; token: string }) => {
        const response = await fetch(`${API_BASE_URL}/tasks?userId=${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) throw new Error('Failed to fetch tasks');
        return response.json();
    },
);

export const addTask = createAsyncThunk(
    'tasks/addTask',
    async ({ task, token }: { task: Partial<Task>; token: string }) => {
        const response = await fetch(`${API_BASE_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(task),
        });
        if (!response.ok) throw new Error('Failed to add task');
        return response.json();
    },
);

export const updateTask = createAsyncThunk(
    'tasks/updateTask',
    async ({
        taskId,
        updates,
        token,
    }: {
        taskId: string;
        updates: Partial<Task>;
        token: string;
    }) => {
        const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updates),
        });
        if (!response.ok) throw new Error('Failed to update task');
        return response.json();
    },
);

export const deleteTask = createAsyncThunk(
    'tasks/deleteTask',
    async ({
        taskId,
        userId,
        token,
    }: {
        taskId: string;
        userId: string;
        token: string;
    }) => {
        const response = await fetch(
            `${API_BASE_URL}/tasks/${taskId}?userId=${userId}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        if (!response.ok) throw new Error('Failed to delete task');
        return taskId;
    },
);

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch tasks
            .addCase(fetchTasks.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to fetch tasks';
            })
            // Add task
            .addCase(addTask.fulfilled, (state, action) => {
                state.tasks.push(action.payload);
            })
            // Update task
            .addCase(updateTask.fulfilled, (state, action) => {
                const index = state.tasks.findIndex(
                    (task) => task.taskId === action.payload.taskId,
                );
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
            })
            // Delete task
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter(
                    (task) => task.taskId !== action.payload,
                );
            });
    },
});

export const {} = tasksSlice.actions;
export { tasksSlice }; // Export the whole slice
export default tasksSlice; // Instead of exporting tasksSlice.reducer
