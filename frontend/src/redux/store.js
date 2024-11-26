import { configureStore } from '@reduxjs/toolkit';
import backgroundReducer from './backgroundSlice';

const store = configureStore({
    reducer: {
        background: backgroundReducer,
    },
});

export default store;
 