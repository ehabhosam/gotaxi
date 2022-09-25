import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, Dimensions } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFormikContext } from "formik";
import { AntDesign } from '@expo/vector-icons';

import colors from './../colors';

const TextInputField = ({icon,focusColor = colors.light.secondary, fieldName,onFieldBlur = ()=> null, ...otherProps }) => {
  const {errors} = useFormikContext(fieldName);
    // {borderColor: focused? focusColor: colors.darkg}
    const [valid, setValid] = useState(false);

    return (
        
        <View style={[styles.container]}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={colors.darkg}
              style={[styles.icon]}
            />
          )}
          
          <TextInput 
            onBlur={(e)=>{
                if (errors[fieldName]) {setValid(false)} else {setValid(true)}; 
                onFieldBlur();
            }} 
            onChange={()=> setValid(false)}
            placeholderTextColor={colors.darkg}
            style={[styles.text]}
            {...otherProps}
          />
          {valid && (
            <AntDesign
              name='checkcircle'
              size={20}
              color={colors.valid}
              style={[styles.icon, styles.valid]}
            />
          )}
        </View>
        
      );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.lightg,
      borderRadius: 25,
      flexDirection: "row",
      width: Dimensions.get('window').width * .9,
      height: Dimensions.get('window').height/15,
      maxHeight: 150, 
      padding: 15,
      marginVertical: 10,
      borderWidth: 2, 
      borderStyle: "solid", 
  },
      icon: {
          marginRight: 10,
      },
      text: {
          color: colors.dark,
          fontSize: 18,
          fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
          width : '85%', 
          height: '100%',
        },
      valid: {
        position: 'absolute',
        right: 10,
        top: '70%'

      }
  });


export default TextInputField;