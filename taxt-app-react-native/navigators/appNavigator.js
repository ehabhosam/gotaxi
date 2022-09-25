import React, { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dimensions, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';

import HomeScreen from '../screens/HomeScreen';
import RidesScreen from '../screens/RidesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import colors from '../colors';
import { selectTheme } from '../slices/appdata';
import HomeButton from '../components/HomeButton';
import { GetColors } from './../colors';
import { selectLanguage } from './../slices/appdata';


const AppNavigator = ()=>{
    const Tab = createBottomTabNavigator()
    const { primary, secondary, navbar_bg } = colors[useSelector(selectTheme)];
    const navigation = useNavigation(); 
    const language = useSelector(selectLanguage)
    const askForLocationPermissions = async ()=>{
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          alert('Permission to access location was denied')
        }
    }
    useEffect(()=>{
        askForLocationPermissions(); 
    },[]);

    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{
                tabBarActiveBackgroundColor: navbar_bg,
                tabBarActiveTintColor: secondary,
                tabBarInactiveBackgroundColor: navbar_bg,
                tabBarInactiveTintColor: primary,
                position: 'absolute',
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    height: Dimensions.get('window').height /14,
                    paddingBottom: 0,
                    borderTopWidth: 0, 
                    borderRadius: 40,
                    zIndex: 20,
                },          
            }}
            >
            <Tab.Screen name='Settings' component={SettingsScreen}
            options={{
                tabBarIcon: ({color, size}) => <FontAwesome5 name="user-cog" size={size} color={color} />,
                headerShown: true,
                headerBackground: () => (
                    <View style={{width: '100%', height: '100%', backgroundColor: navbar_bg}} /> ),
                headerTitleStyle: {
                    color: primary
                },
                headerTitle: language === 'en'? 'Settings' : 'الإعدادات',
            }}
            />
            <Tab.Screen name='Home' component={HomeScreen}  
            options={{
                tabBarButton: (props)=> {
                    return (
                        <HomeButton focused={props.accessibilityState.selected} primary={primary} secondary={secondary} background={navbar_bg} onPress={()=> navigation.navigate('Home')} />
                        )
                    },
                }}
            />
            <Tab.Screen name='Rides' component={RidesScreen}
            options={{
                tabBarIcon: ({color, size}) => <MaterialCommunityIcons name="message-processing" size={size} color={color} />
            }}
            />
        </Tab.Navigator>
    )
}

export default AppNavigator;