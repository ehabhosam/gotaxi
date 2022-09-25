import { useSelector } from "react-redux";

import { selectTheme } from "./slices/appdata";

const  colors = {
    light: {
        primary: '#1B1A17', 
        secondary: '#fcbe03', 
        background: '#f2f2f2', 
        navbar_bg: '#e8e6e6',
    },
    dark: {
        primary: '#f2f2f2', 
        secondary: '#fcbe03', 
        background: '#1B1A17',
        navbar_bg: '#0d0c0b',
    },
    lightg:  '#f0f0f0',
    darkg: '#808080',
    valid: '#2B874B',
}

export const GetColors = ()=>{
    return colors[useSelector(selectTheme)]; 
}

export default colors; 