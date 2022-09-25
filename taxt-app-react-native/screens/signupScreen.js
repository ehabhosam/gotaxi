import React from "react";
import { StyleSheet, Image, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Yup from "yup";
import { useSelector } from "react-redux";

import Screen from '../components/Screen';
import AppForm from './../components/forms/AppForm';
import AppFormField from './../components/forms/AppFormField';
import SubmitButton from './../components/forms/SubmitButton';
import AppText from "../components/AppText";
import colors from './../colors';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validationSchema = Yup.object().shape({
  firstName: Yup.string().matches(/^[A-Za-z ]*$/, 'Please enter valid name').max(40).required().label('First Name'),
  lastName: Yup.string().matches(/^[A-Za-z ]*$/, 'Please enter valid name').max(40).required().label('Last Name'),
  signup_email: Yup.string().required('Please enter an Email').email('Enter a valid Email').label("Email"),
  signup_phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').label('Phone Number'),
  signup_password: Yup.string().required('Enter your Password').min(8).label("Password"),
  passwordConfirmation: Yup.string().oneOf([Yup.ref('signup_password'), null], 'Passwords must match')
});


function SignupScreen({navigation}) {
  const theme = useSelector(state=> state.appData.theme);
  const colorsObj = {...colors[theme]};
  return (
    <Screen style={[styles.container, {backgroundColor: colorsObj.background}]}>
      <Image style={styles.logo} source={theme === 'light'?require("../assets/TaxLogo.png"):require("../assets/DarkModeLogo.png")} />

      <AppForm
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        <View style={styles.nameWrap}>
            {/* First Name */}
            <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            name="firstName"
            placeholder="First Name"
            textContentType="name"
            />
            {/* Last Name */}
            <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            name="lastName"
            placeholder="Last Name"
            textContentType="familyName"
            />
        </View>
        {/* Email */}
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="signup_email"
          placeholder="Email"
          textContentType="emailAddress"
        />
        {/* Phone */}
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="phone"
          keyboardType="numeric"
          name="signup_phone"
          placeholder="Phone"
          textContentType="telephoneNumber"
        />
        {/* Password */}
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="signup_password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        {/* Confirm Password */}
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="passwordConfirmation"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Sign Up" />
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
    width: 200,
    height: 62,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  pressText: {
    paddingTop: 10,
  },
}); 

export default SignupScreen;
