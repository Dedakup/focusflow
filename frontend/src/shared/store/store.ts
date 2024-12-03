import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { timerSlice } from '@timer';
import { backgroundReducer } from '@background';
import { tasksSlice } from '@tasks';
import { musicSlice } from '@music';
import { apiSlice } from '@store';
import { authSlice } from '@auth';

const makeStore = () =>
    configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(apiSlice.middleware),
    });

const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice.reducer, // Auth state management
    timer: timerSlice.reducer,
    background: backgroundReducer,
    tasks: tasksSlice.reducer,
    music: musicSlice.reducer,
});

export const store = makeStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const wrapper = createWrapper(makeStore);
