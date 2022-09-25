import React from "react";
import Constants from "expo-constants";
import { StyleSheet, SafeAreaView, View, KeyboardAvoidingView } from "react-native";
import { useSelector } from "react-redux";

import WrapperWithKeyboardDismiss from './wrapper'
import colors from './../colors';

function Screen({ children, style }) {
  const theme = useSelector(state=> state.appData.theme);
  const { background } = {...colors[theme]};
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
        <WrapperWithKeyboardDismiss>
          <SafeAreaView style={[styles.screen,{backgroundColor: background}, style]}>
            <View style={style}>{children}</View>
          </SafeAreaView>
        </WrapperWithKeyboardDismiss>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
});

export default Screen;
