import React from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function HomeButton({ onPress, primary, secondary, background, focused }) {
  const _d = Dimensions.get('window').width; 
  const styles = StyleSheet.create({
  outer: {
    width: Dimensions.get('window').width /3,
    backgroundColor: background,
    alignItems: 'center'
  },
  container: {
    alignItems: "center",
    backgroundColor: background,
    borderColor: focused? secondary: primary,
    borderRadius: _d/10,
    borderWidth: _d/43,
    bottom: _d/20,
    height: _d/5,
    justifyContent: "center",
    width: _d/5,
  },
});

  return (
    <View style={styles.outer}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
          <MaterialCommunityIcons
            name="taxi"
            color={focused? secondary: primary}
            size={40}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}


export default HomeButton;
