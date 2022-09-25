import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, Platform, View } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps'; 
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import AppText from './../AppText';
import { selectTheme } from '../../slices/appdata';
import DarkMapJSON from '../../assets/darkmap'
import colors, { GetColors } from '../../colors';


const Row = ({children, pb = 0, pt = 0, width = '80%'})=> <View style={[styles.row, {paddingBottom: pb, paddingTop: pt, width}]}>{children}</View>

const CurrentRideCard = ({_from = 'Damietta', _to='Cairo', price = '20SR', paid, ride_status= 'Submitted', ride_time = '38mins'})=>{
    const [userLocation, setUserLocation] = useState(null);
    const theme = useSelector(selectTheme);
    const language = useSelector() 
    const { secondary, primary } = GetColors(); 
    const getUserLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          alert('Permission to access location was denied');
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setUserLocation(location);
      }

    useEffect(() => {
        getUserLocation();
      }, []);


    return <>
        <AppText alignment={'center'}>{'Ride Status'}</AppText>
        <AppText styles={{fontWeight: 'bold'}} size={Dimensions.get('window').width / 15} color={secondary} alignment={'center'}>{ride_status}</AppText>
        {userLocation ? 
        <View style={{ alignItems: 'center' }}>
            <MapView 
                mapType={Platform.OS == "android" ? "none" : "standard"}
                style={styles.map} 
                customMapStyle={ theme === 'dark' ? DarkMapJSON : []} 
                provider={MapView.PROVIDER_GOOGLE}
                region = {{
                    latitude: userLocation.coords.latitude + 0.0004,
                    longitude: userLocation.coords.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}
                onRegionChange={()=> {console.log('region changed'); getUserLocation()}}
            >
                <Marker 
                    coordinate={{
                        latitude: userLocation.coords.latitude,
                        longitude: userLocation.coords.longitude
                    }}
                >
                    <Ionicons name="man" size={Dimensions.get('window').height / 20} color="tomato" />
                </Marker>
            </MapView> 
            <Row width='60%' pb={20}>
                <Ionicons style={styles.icon} name="location-sharp" size={24} color={'tomato'} />
                <AppText>{_from}</AppText>    
                <FontAwesome style={styles.arrow} name="long-arrow-right" size={24} color={primary} />
                <Ionicons style={styles.icon} name="location-sharp" size={24} color={'dodgerblue'} />
                <AppText>{_to}</AppText>
            </Row>
            <Row>
                <AppText size={20}>Ride Time:</AppText>
                <AppText size={20}>{ride_time}</AppText>
            </Row>
            <Row>
                <AppText styles={{fontWeight: 'bold'}} size={25}>Price:</AppText>
                <AppText styles={{fontWeight: 'bold'}} size={25}>{price}</AppText>
            </Row>
        </View>
        : 
        <AppText styles={{fontStyle: 'italic'}}>Location is loading ...</AppText>
        }
        
    </>
}

const styles = StyleSheet.create({
    container: {},
    map: {
        width: '100%',
        height: Dimensions.get('window').height / 3,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})



export default CurrentRideCard; 