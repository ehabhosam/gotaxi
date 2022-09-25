import { configureStore, combineReducers } from "@reduxjs/toolkit";
import navReducer from './slices/navSlice'; 
import appDataReducer from './slices/appdata';

const rootReducer = combineReducers({
    nav: navReducer, 
    appData: appDataReducer,
})

export const store = configureStore({
    reducer: rootReducer 
});  