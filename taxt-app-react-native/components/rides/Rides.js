import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import RideCard from './RideCard'
import { GetColors } from '../../colors';

const Rides = ({ ridesArray = [], onRefresh, refreshing })=>{
    return (
        <View style={[styles.container, {backgroundColor: GetColors().background, padding:10}]} >
                <FlatList                     
                    data={ridesArray} 
                    renderItem={({ item })=> <RideCard 
                        _from={item.from_Location}
                        _to={item.to_Location}
                        price={item.price}
                        ride_status={item.ride_status}
                        keyExtractor={(item, index) => index}
                    ></RideCard>}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
        </View>
    )
}

export default Rides; 

const styles = StyleSheet.create({
    container: {
        flex :1,
    },
  });