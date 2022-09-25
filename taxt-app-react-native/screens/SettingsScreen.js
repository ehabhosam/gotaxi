import React, {useState } from 'react';
import { SafeAreaView, View, Dimensions, StyleSheet, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';

import Screen from '../components/Screen';
import AppText from '../components/AppText';
import { selectTheme, selectLanguage, toggleTheme, toggleLanguage, setLanguage } from '../slices/appdata';
import { GetColors } from './../colors';

const window_width = Dimensions.get('window').width;
const window_height = Dimensions.get('window').height;


const SettingsRow = ({children, language})=><View style={[styles.container, {backgroundColor: GetColors().navbar_bg, flexDirection: language === 'en'? 'row': 'row-reverse'}]}>{children}</View>

const SettingsScreen = ()=>{
    const dispatch = useDispatch(); 
    const theme = useSelector(selectTheme);
    const language = useSelector(selectLanguage);
    const [themeBool, setThemeBool] = useState(theme === 'light'? false: true);
    const [languageBool, setLanguageBool] = useState(language === 'ar'? false: true);
    const [open, setOpen] = useState(false);
    const [dropValue, setDropValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'English', value: 'en'},
        {label: "العربية", value: 'ar'}
    ]);
    const colorsObj = GetColors(); 
    const dummyUser = {
        username: 'Walid Al-Qahtany',
        email: 'walid_q2022@gmail.com', 
        mobile: '+966 56 376 0628'
    }
    return (
    <Screen>
        <SettingsRow language={language} style={styles.container}>
            <Ionicons name="person-circle" size={window_width / 4} color={colorsObj.primary} />
            <View style={styles.user_info}>
                {language === 'en'? 
                <>
                    <AppText styles={{ fontWeight: 'bold' }}  color={'tomato'}>Welcome, {dummyUser.username}</AppText>
                    <AppText>Email: {dummyUser.email}</AppText>
                    <AppText>Phone: {dummyUser.mobile}</AppText>
                </> : <>
                    <AppText styles={{ fontWeight: 'bold' }} color={'tomato'}>مرحبا .. {dummyUser.username}</AppText>
                    <AppText size={15}>البريد الإلكتروني: {dummyUser.email}</AppText>
                    <AppText size={15}>رقم الهاتف: {dummyUser.mobile}</AppText>
                </>}
            </View>
        </SettingsRow>
        <SettingsRow language={language}>
            <AppText styles={{ fontWeight: 'bold' }}>{language === 'en'? 'Dark Mode': 'الوضع الداكن'}</AppText>
            <Switch
                value={themeBool}
                onValueChange={()=>{
                    dispatch(toggleTheme());
                    setThemeBool(!themeBool)
                }}
            ></Switch>
        </SettingsRow>
        <SettingsRow language={language}>
        <AppText styles={{ fontWeight: 'bold' }}>{language === 'en'? 'Language': "اللغة"}</AppText>
            <DropDownPicker
            open={open}
            value={dropValue}
            items={items}
            setOpen={setOpen}
            setValue={setDropValue}
            setItems={setItems}
            placeholder= {language === 'en'? 'Change language': 'اختر ...'}
            theme={theme.toUpperCase()}
            onChangeValue={(value) => {
                dispatch(setLanguage(value));
                // setItems([
                //     {label: language === 'en'? 'English': "اللغة الانجليزية" , value: 'en'},
                //     {label: language === 'en'? 'Arabic': "اللغة العربية", value: 'ar'}
                // ])
            }}
            containerStyle={styles.dropdown}
            />
        </SettingsRow>
    </Screen>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        padding: 10, 
        width: window_width,
        minHeight: window_height/ 15, 
        alignItems: 'center',
        marginTop: 10, 
        justifyContent: 'space-between'
    },
    dropdown: {
        width: window_width * .5,
    },
    user_info: {
        width: window_width * .66,
        height: window_height / 10,
        display: 'flex',
        justifyContent: "space-between"
    }
});

export default SettingsScreen; 