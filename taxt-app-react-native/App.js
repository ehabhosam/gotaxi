import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Provider as StoreProvider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';

import { store } from './store';
import * as useSecureStore from './hooks/useSecureStore'; 
import AppNavigator from './navigators/appNavigator';
import NotLoggedInNavigator from './navigators/notLoggedInNavigator';



export default function App() {
  const [Token, setToken] = useState();
  const [fontsLoaded] = useFonts({
    'Questv1-Bold': require('./assets/Questv1-Bold.otf')
  });
  // get login token if available
  useEffect(()=>{
    useSecureStore.getSecurelySaved('go_taxi_jwt').then(result => setToken(result))
  },[])

  return (
    <StoreProvider store={store}>
            <NavigationContainer>
              {Token? <AppNavigator /> : <NotLoggedInNavigator />}
            </NavigationContainer>
    </StoreProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
});
