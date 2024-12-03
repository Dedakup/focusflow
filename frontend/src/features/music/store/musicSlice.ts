import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MusicSource {
    id: string;
    thumbnail: string;
    title: string;
}

interface MusicState {
    selectedMusicSource: MusicSource | null;
    isPlaying: boolean;
    volume: number;
}

const initialState: MusicState = {
    selectedMusicSource: null,
    isPlaying: false,
    volume: 50,
};

const musicSlice = createSlice({
    name: 'music',
    initialState,
    reducers: {
        setSelectedMusicSource: (
            state,
            action: PayloadAction<MusicSource | null>,
        ) => {
            state.selectedMusicSource = action.payload;
        },
        setIsPlaying: (state, action: PayloadAction<boolean>) => {
            state.isPlaying = action.payload;
        },
        setVolume: (state, action: PayloadAction<number>) => {
            state.volume = action.payload;
        },
    },
});

export const { setSelectedMusicSource, setIsPlaying, setVolume } =
    musicSlice.actions;
export { musicSlice };
export default musicSlice;
