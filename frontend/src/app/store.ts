import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { timerSlice } from '@timer';
import { backgroundSlice } from '@background';
import { tasksSlice } from '@tasks';
import { musicSlice } from '@music';

const makeStore = () =>
    configureStore({
        reducer: {
            //TODO: Add user profile slice
            timer: timerSlice.reducer,
            background: backgroundSlice.reducer,
            tasks: tasksSlice.reducer,
            music: musicSlice.reducer,
        },
        // Add middleware or other configuration here
    });

export const store = makeStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const wrapper = createWrapper(makeStore);
