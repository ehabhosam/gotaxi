import React from 'react';
import { View, StyleSheet } from 'react-native';

import AppText from '../AppText';
import Rides from './Rides';
import AppButton from './../AppButton';
import { GetColors } from './../../colors';
import CurrentRideCard from './currentRideCard';

const CurrentRideTab = ({ currentRide, onRefresh, refreshing, language })=> {
    const colorsObj = GetColors();
    return currentRide.length? 
    // <Rides ridesArray={currentRide} onRefresh={onRefresh} refreshing={refreshing}/> 
    <View style={[styles.container, {backgroundColor: colorsObj.background}]}>
        <CurrentRideCard></CurrentRideCard>
    </View>
    : 
    <View style={[styles.container, {backgroundColor: colorsObj.background, paddingTop: 100,}]}>
        <AppText styles={{paddingBottom: 20,}} color={colorsObj.primary} alignment={'center'}>{language === 'en'?'No Ride Going right now' : 'لا توجد رحلات جارية الان'}</AppText>
        <AppButton title={language === 'en'? 'Start New Ride!': 'ابدأ رحلة جديدة !'}/>
    </View>
}

const styles =  StyleSheet.create({
    container: {
        display: 'flex', 
        padding: 10,
        height: '100%',
    }
})

export default CurrentRideTab; 