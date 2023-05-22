import React from "react";
import { View, StyleSheet } from "react-native";
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
    width: "100%",

    backgroundColor: "#F5F5F5",
    height: 100,
    padding: 18,
  },
});

export default Header;
