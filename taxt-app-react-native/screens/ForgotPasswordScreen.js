import React from 'react';
import {  View, StyleSheet, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';

import Screen from '../components/Screen';
import AppText from './../components/AppText';
import AppForm from '../components/forms/AppForm';
import AppFormField from '../components/forms/AppFormField';
import colors from './../colors';
import SubmitButton from '../components/forms/SubmitButton';
import { Dimensions } from 'react-native';


const validationSchema = Yup.object().shape({
    email: Yup.string().required('Please enter an Email').email('Enter a valid Email').label("Email"),
});

const ForgotPasswordScreen = ({ navigation }) => {
    const theme = useSelector(s=> s.appData.theme); 
    const resetPasswordAlert = () => Alert.alert(
      "Check Your Email",
      "A mail with the reset link will be sent to your email if it exists.",
      [
        { text: "OK", onPress: () => navigation.navigate('login') }
      ]
    );


    return (
        <Screen>
            <View style={[styles.container]}>
                <AppText styles={styles.text} size={20}>Enter your Email to reset Password</AppText>
                <AppForm
                    initialValues={{ email: ""}}
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
                    <SubmitButton title="Reset Password" onPress={resetPasswordAlert} />
                </AppForm>
            </View>
        </Screen>
    );
}
const styles = StyleSheet.create({
    container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Dimensions.get('window').height /3,
},
    text: {
        marginBottom: 30,
        fontSize: 20
    }
})

export default ForgotPasswordScreen;