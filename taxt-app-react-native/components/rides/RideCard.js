import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'; 
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import AppText from '../AppText';
import colors, {GetColors} from '../../colors';

const RideCard = ({_from, _to, price, ride_status})=>{
    const _h = Dimensions.get('window').height;
    const state_color = ride_status === 'cancelled'? 'tomato':
    ride_status === 'stopped'? 'tomato': 'green';
    const colorsObj = GetColors(); 
    return (
        <TouchableOpacity>
            <View style={[styles.container, {backgroundColor: useSelector(s=> s.appData.theme)=== 'light'? colorsObj.navbar_bg :'#303030',
            marginBottom: _h /50,
            padding: _h /50,
            borderRadius: _h /50,
            borderColor: 'lightgrey',
            borderWidth: _h /150,}]}>
                <View style={styles.row}>
                    <Ionicons style={styles.icon} name="location-sharp" size={24} color={'tomato'} />
                    <AppText>{_from}</AppText>    
                    <FontAwesome style={styles.arrow} name="long-arrow-right" size={24} color={colorsObj.primary} />
                    <Ionicons style={styles.icon} name="location-sharp" size={24} color={'dodgerblue'} />
                    <AppText>{_to}</AppText>
                </View>
                <AppText styles={{fontWeight: 'bold',color: state_color}}>{ride_status.split('').map((e,i)=> i == 0? e.toUpperCase(): e).join('')}</AppText>
                <AppText>Price: {price} SR</AppText>
                <AppText>{(new Date()).toString().slice(0, 16)}</AppText>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '80%'
    },
    arrow: {
        marginRight: 10,
        marginLeft: 10
    },
    icon: {
        marginRight: 5,
    }
});

export default RideCard; 

