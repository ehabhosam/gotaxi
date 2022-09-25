import React from 'react';
import { View , TouchableOpacity, StyleSheet, Dimensions, StatusBar } from 'react-native'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector, useDispatch, connect } from 'react-redux';
import colors from './../colors';
import { toggleTheme } from '../slices/appdata'

function SwitchTheme() {
    const color = colors[useSelector(s => s.appData.theme)].primary;
    const dispatch = useDispatch(); 

    return (
        <View style={styles.container}>
            <TouchableOpacity 
            onPress={()=> dispatch(toggleTheme())}
            >
                    <MaterialCommunityIcons 
                        name='theme-light-dark'
                        color={color}
                        size={50}
                        style={styles.icon}
                    /> 
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        transform: [
            { translateX: (Dimensions.get('window').width /2) - 40 },
            { translateY: -((Dimensions.get('window').height /2) - StatusBar.currentHeight - 70) },
        ]
    }
});

export default SwitchTheme;