import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    origin: null, 
    destination: null, 
    travelTiemInformation: null
}

export const navSlice = createSlice({
    name: 'nav', 
    initialState, 
    reducers: {
        setOrigin: (state, action) => {
            state.origin = action.payload; 
        },
        setDestination: (state, action) => { 
            state.destination = action.payload; 
        },
        setTravelTiemInformation: (state, action) => {
            state.travelTiemInformation = action.payload; 
        },
    }
}); 


export const { setOrigin, setDestination, setTravelTiemInformation } = navSlice.reducer; 

// Selectors : 
export const selectOrigin = (state) => state.nav.origin; 
export const selectDestination = (state) => state.nav.destination; 
export const selectTravelTimeInformation = (state) => state.nav.travelTiemInformation; 

export default navSlice.reducer;