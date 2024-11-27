import { configureStore } from '@reduxjs/toolkit';
import backgroundReducer from '../redux/backgroundSlice';
import soundReducer from '../redux/soundSlice';

const store = configureStore({
    reducer: {
        background: backgroundReducer,
        ambientSound: soundReducer,
    },
});

export default store;
