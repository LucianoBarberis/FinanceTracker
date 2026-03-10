import { createSlice } from '@reduxjs/toolkit';

const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
    }
    return "light";
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        mode: getInitialTheme()
    },
    reducers: {
        toggleTheme: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
            localStorage.setItem("theme", state.mode);
        }
    }
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
