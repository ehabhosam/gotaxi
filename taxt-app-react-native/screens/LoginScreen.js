import React from "react";
import { StyleSheet, Image, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Yup from "yup";
import { useSelector } from "react-redux";

import Screen from '../components/Screen';
import AppForm from './../components/forms/AppForm';
import AppFormField from './../components/forms/AppFormField';
import SubmitButton from './../components/forms/SubmitButton';
import AppText from "../components/AppText";
import colors from './../colors';
import SwitchTheme from './../components/switchTheme';

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Please enter an Email').email('Enter a valid Email').label("Email"),
  password: Yup.string().required('Enter your Password').min(8).label("Password"),
});


function LoginScreen({navigation}) {
  const forgotPassword = ()=> {
    navigation.navigate('forgotPassword');
  }
  const signUp = ()=> {
    navigation.navigate('signup');
  }
  const theme = useSelector(state=> state.appData.theme);
  const colorsObj = {...colors[theme]};
  return (
    <Screen style={[styles.container, {backgroundColor: colorsObj.background}]}>
      <SwitchTheme />
      <Image style={styles.logo} source={theme === 'light'?require("../assets/TaxLogo.png"):require("../assets/DarkModeLogo.png")} />

      <AppForm
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <TouchableOpacity style={styles.pressText} onPress={forgotPassword}>
          <AppText size={15} styles={{color: colorsObj.primary}}>Forgot Password?</AppText>
        </TouchableOpacity>
        <SubmitButton title="Login" />
        <AppText size={15} styles={{color: colorsObj.primary, paddingTop: 30}}>New To GoTaxi?</AppText>
        <TouchableOpacity style={styles.pressText} onPress={signUp}>
          <AppText size={20} styles={{color: colorsObj.secondary}}>Join Us!</AppText>
        </TouchableOpacity>
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingTop: Dimensions.get('window').height/2,
    justifyContent: 'center',
    alignItems: "center",
  },
  logo: {
    width: 250,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  pressText: {
    paddingTop: 10,
  },
}); 

export default LoginScreen;
