import React from 'react';
import { View, TouchableWithoutFeedback, Keyboard , StyleSheet} from 'react-native';

const WrapperWithKeyboardDismiss = ({children})=>{

    const closeKeyboard = ()=> Keyboard.dismiss(); 

    return (
        <TouchableWithoutFeedback  onPress={closeKeyboard}>
            <View style ={StyleSheet.create({ height: '100%'})}>{children}</View>
        </TouchableWithoutFeedback>
    )
}

export default WrapperWithKeyboardDismiss; 