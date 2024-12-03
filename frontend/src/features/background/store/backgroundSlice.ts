import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@store';
import backgroundsData from '../assets/backgrounds.json';
import { BackgroundState } from '../types';

interface BackgroundInterface {
    id: string;
    src: string;
    fallbackSrc?: string; // Optional fallback source
    // ... other existing properties
}

const initialState: BackgroundState = {
    backgrounds: backgroundsData,
    selectedBackground: backgroundsData[0],
};

const backgroundSlice = createSlice({
    name: 'background',
    initialState,
    reducers: {
        setBackgrounds: (state, action) => {
            state.backgrounds = action.payload; // Replace the state, don't append
        },
        selectBackground: (state, action) => {
            state.selectedBackground = action.payload;
        },
    },
});

export const { setBackgrounds, selectBackground } = backgroundSlice.actions;
export const selectBackgrounds = (state: RootState) =>
    state.background.backgrounds;
export const selectSelectedBackground = (state: RootState) =>
    state.background.selectedBackground;
export default backgroundSlice.reducer;
