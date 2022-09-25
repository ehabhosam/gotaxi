import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 

import LoginScreen from '../screens/LoginScreen'; 
import SignupScreen from '../screens/signupScreen'; 
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';

const NotLoggedInNavigator = ()=>{
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='login' component={LoginScreen} />
            <Stack.Screen name='signup' component={SignupScreen} />
            <Stack.Screen name='forgotPassword' component={ForgotPasswordScreen} />
        </Stack.Navigator>
    )
}

export default NotLoggedInNavigator; 