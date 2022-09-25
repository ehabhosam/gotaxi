import React from 'react';
import { Text, Platform, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { GetColors } from '../colors';
import { selectTheme, selectLanguage } from '../slices/appdata';

const AppText = ({
    children, 
    color, 
    styles ={},
    size= 18,
    alignment = null,
    ...other
}) => {
    const theme = useSelector(selectTheme);
    const language = useSelector(selectLanguage);
    const { primary } = GetColors();
    const arabic = /[\u0600-\u06FF]/;
    return (
        <Text style={[
             styles,
            {   
                color: color? color: primary,
                fontSize: size,
                textAlign: alignment? alignment : language === 'en'? 'left': 'right',
                fontFamily: !arabic.test(children)? (Platform.OS === "android" ? "Roboto" : "Avenir"):'Questv1-Bold',
            }, 
        ]} {...other} >{children}</Text>
    )
}

export default AppText; 