import React from "react";
import { useFormikContext } from "formik";
import { useSelector } from "react-redux";

import AppButton from "../AppButton";
import { Keyboard } from 'react-native';
import colors from "../../colors";


function SubmitButton({ title, onPress= () => null }) {
  const { handleSubmit } = useFormikContext();
  const theme = useSelector(state => state.appData.theme); 
  const colorsObj = colors[theme]; 


  return <AppButton title={title} onPress={()=> {
    Keyboard.dismiss();
    handleSubmit();
    onPress()}}
    bgColor={colorsObj.secondary}
    textColor={colorsObj.primary}
    />;
}

export default SubmitButton;
