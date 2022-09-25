import React, { useEffect, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Dimensions } from 'react-native';

import Screen from '../components/Screen';
import AppText from '../components/AppText';
import { GetColors } from '../colors';
import AppButton from '../components/AppButton';
import { selectScreenHeightWithoutNavbar } from '../slices/appdata';
import { selectLanguage } from './../slices/appdata';
import CurrentRideTab from '../components/rides/currentRideTab';
import PreviousRidesTab from '../components/rides/PreviousRidesTab';

const HomeScreen = ()=>{
    const Stack = createNativeStackNavigator();
    const Tab = createMaterialTopTabNavigator();
    const [currentRides, setCurrentRides] = useState([]);
    const [previousRides, setPreviousRides] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const screenHeight = useSelector(selectScreenHeightWithoutNavbar); 
    const language = useSelector(selectLanguage);
    const colors = GetColors();
    useEffect(()=>{
        getCurrentRide();
        getPreviousRides();
    },[]);

    const getPreviousRides = async ()=>{
        // should call server to get Rides. 
        let dummy = [
            { 
                client_id: 2413432434, 
                driver_id: 7474934834, 
                from_Location: 'Gaddah',
                to_Location: "Riyhad",
                ride_status: "Done",
                price: "28"
            },
            { 
                client_id: 2413432434, 
                driver_id: 6097069767, 
                from_Location: 'Dammam',
                to_Location: "Riyhad",
                ride_status: "Done",
                price: "15"
            },
            { 
                client_id: 2413432434, 
                driver_id: 8567596566, 
                from_Location: 'Madinah',
                to_Location: "Abha",
                ride_status: "Cancelled",
                price: "50"
            },
            { 
                client_id: 2413432434, 
                driver_id: 8058504404, 
                from_Location: 'Riyhad',
                to_Location: "Gaddah",
                ride_status: "Stopped",
                price: "28"
            },
            
        ];
        setPreviousRides(dummy)
    }

    const getCurrentRide = async ()=> {
        const dummyCurrent = { 
                client_id: 2413432434, 
                driver_id: 7474934834, 
                from_Location: 'Gaddah',
                to_Location: "Riyhad",
                ride_status: "Done",
                price: "28"
            }
        setCurrentRides([dummyCurrent])
    }

    const onRefresh = React.useCallback(() => {
        console.log('Refreshing')
        setRefreshing(true);
        setTimeout(()=>setRefreshing(false), 2000);
    }, []);

    return (
        <Screen style={{ paddingLeft: 15, paddingRight: 15, height: screenHeight }}>
            <AppText size={Dimensions.get('window').width / 10} styles={{ paddingBottom: 10}}>
                {language === 'en'? 'Your Rides': 'رحلاتك'}
            </AppText>
            {
                <Tab.Navigator 
                    initialRouteName='Current'
                    screenOptions={{
                        tabBarActiveTintColor: colors.secondary,
                        tabBarInactiveTintColor: colors.primary,
                        tabBarItemStyle: { backgroundColor: colors.background },
                        tabBarLabelStyle: [{ fontSize: Dimensions.get('window').width /27, fontWeight: "bold" }, language === 'ar' && { fontFamily: 'Questv1-Bold' }]
                }}>
                    <Tab.Screen 
                    options={{ tabBarLabel: language === 'en'? 'Current Ride' : 'الرحلة الحالية'}} 
                    name="Current" 
                    children={()=><CurrentRideTab currentRide={currentRides} refreshing={refreshing} onRefresh={onRefresh} language={language}/>} />
                    <Tab.Screen 
                    options={{ tabBarLabel: language === 'en'? 'Previous Rides' : 'الرحلات السابقة'}} 
                    name="Previous" 
                    children={()=><PreviousRidesTab previousRides={previousRides} refreshing={refreshing} onRefresh={onRefresh}/>} />
                </Tab.Navigator>
            }
        </Screen>
    );
}

export default HomeScreen; 