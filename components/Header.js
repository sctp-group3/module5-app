import React from "react";
import { View, StyleSheet, Text } from "react-native";
import SearchBar from "./SearchBar";

const Header = ({ onSubmit }) => {
  return (
    <View style={styles.header}>
      <SearchBar onSubmit={onSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#F5F5F5",
    padding: 10,
    justifyContent: "flex-start",
    width: "100%",
  },
});

export default Header;
