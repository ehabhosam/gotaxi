import { createSlice } from '@reduxjs/toolkit';
import { Dimensions } from 'react-native';

const initialState = {
    theme: 'light', 
    language: 'en',
    screenHeightWithoutNavbar: (Dimensions.get('window').height - (Dimensions.get('window').height / 14))
} 

const appDataSlice = createSlice({
    name: 'appData', 
    initialState, 
    reducers: {
        setTheme: (state, action)=> {
            state.theme = action.payload; 
        },
        toggleTheme: (state)=> {
            state.theme = state.theme === 'light'? 'dark': 'light';
        },
        setLanguage: (state, action)=> {
            state.language = action.payload; 
        },
        toggleLanguage: (state)=> {
            state.language = state.language === 'en'? 'ar': 'en';
        },
    }
});

export const { setTheme, setLanguage, toggleTheme, toggleLanguage } = appDataSlice.actions; 

// Selectors : 
export const selectTheme = (state) => state.appData.theme; 
export const selectLanguage = (state) => state.appData.language; 
export const selectScreenHeightWithoutNavbar = (state) => state.appData.screenHeightWithoutNavbar; 

export default appDataSlice.reducer; 

