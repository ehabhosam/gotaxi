import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../colors";

function AppButton({ title, onPress, bgColor = colors.light.secondary, textColor = colors.light.primary, button_width = null, button_height = null }) {    
    
    const styles = StyleSheet.create({
        button: {
        backgroundColor: bgColor,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        width: button_width? button_width : 'auto',
        height: button_height? button_height : 'auto',
        marginVertical: 10,
        },
        text: {
        color: textColor,
        fontSize: 18,
        textTransform: "uppercase",
        fontWeight: "bold",
        },
    });
  return (
    <TouchableOpacity
      style={[styles.button ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}


export default AppButton;
