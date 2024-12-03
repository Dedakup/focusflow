import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        isLoading: true,
        isAuthenticated: false,
    },
    reducers: {
        setAuth: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.isLoading = false;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.isLoading = false;
        },
    },
});

export const { setAuth, setLoading, logout } = authSlice.actions;
export { authSlice };
export default authSlice.reducer;
