import React from 'react';
import AppText from '../AppText';
import Rides from './Rides';

const PreviousRidesTab = ({ previousRides, onRefresh, refreshing })=> {
    return previousRides? 
    <Rides ridesArray={previousRides} onRefresh={onRefresh} refreshing={refreshing}/> 
    : 
    <AppText>No previous Rides to show</AppText>
}

export default PreviousRidesTab; 