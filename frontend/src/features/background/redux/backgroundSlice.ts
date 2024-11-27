import { createSlice } from '@reduxjs/toolkit';

const backgroundSlice = createSlice({
    name: 'background',
    initialState: {
        backgrounds: [],
        selectedBackground: {
            name: 'Tiny Camp Fire',
            src: 'https://dev-focusflow-assets-274552760074.s3.us-east-1.amazonaws.com/backgrounds/videos/Tiny-Camp-Fire.mp4',
            thumbnailSrc:
                'https://dev-focusflow-assets-274552760074.s3.us-east-1.amazonaws.com/backgrounds/thumbnail/Tiny-Camp-Fire.jpg',
        },
    },
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
export default backgroundSlice.reducer;
