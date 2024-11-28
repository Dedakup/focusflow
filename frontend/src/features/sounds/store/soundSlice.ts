import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    ambientSounds: [],
};

const soundSlice = createSlice({
    name: 'ambientSound',
    initialState,
    reducers: {
        setAmbientSounds: (state, action) => {
            state.ambientSounds = action.payload; // Replace existing state with new sounds
        },
        updateAmbientSoundVolume: (state, action) => {
            const { id, volume } = action.payload;
            const sound = state.ambientSounds.find((sound) => sound.id === id);
            if (sound) {
                sound.volume = volume; // Update the volume for the specific sound
            }
        },
    },
});

export const { setAmbientSounds, updateAmbientSoundVolume } =
    soundSlice.actions;
export default soundSlice.reducer;
