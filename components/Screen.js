// Screen.js
import React from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Screen = ({ children }) => (
  <LinearGradient
    colors={["#3B82F6", "#06B6D4"]}
    style={styles.gradient}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
  >
    {children}
  </LinearGradient>
);

const styles = StyleSheet.create({
  gradient: {
    padding: 20,
    justifyContent: "center",

    flex: 1,
  },
});

export default Screen;
