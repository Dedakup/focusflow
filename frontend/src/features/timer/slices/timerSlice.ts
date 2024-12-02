//Steps to create a slice:
//1. Create the initial state
//2. Create the slice
//3. Export the actions
//4. Export the reducer

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TimerState {
    timeLeft: number;
    isRunning: boolean;
    currentPhase: 'focus' | 'break';
    hasStarted: boolean;
    focusDuration: number;
    breakDuration: number;
}

const initialState: TimerState = {
    timeLeft: 25 * 60, // 25 minutes in seconds
    isRunning: false,
    currentPhase: 'focus',
    hasStarted: false,
    focusDuration: 25 * 60,
    breakDuration: 5 * 60,
};

export const timerSlice = createSlice({
    name: 'timer',
    initialState,
    reducers: {
        startTimer: (state) => {
            state.isRunning = true;
        },
        pauseTimer: (state) => {
            state.isRunning = false;
        },
        resetTimer: (state) => {
            state.timeLeft =
                state.currentPhase === 'focus'
                    ? state.focusDuration
                    : state.breakDuration;
            state.isRunning = false;
        },
        updateTimeLeft: (state, action: PayloadAction<number>) => {
            state.timeLeft = action.payload;
        },
        switchPhase: (state) => {
            state.currentPhase =
                state.currentPhase === 'focus' ? 'break' : 'focus';
            state.timeLeft =
                state.currentPhase === 'focus'
                    ? state.focusDuration
                    : state.breakDuration;
        },
    },
});

export const {
    startTimer,
    pauseTimer,
    resetTimer,
    updateTimeLeft,
    switchPhase,
} = timerSlice.actions;

export default timerSlice.reducer;
