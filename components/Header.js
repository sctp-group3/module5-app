import React from "react";
import { View, StyleSheet, Text } from "react-native";
import SearchBar from "./SearchBar";
import CurrentLocationButton from "./CurrentLocationButton";
import FavoritesDialog from "./FavouritesDialog";

const Header = ({ onSubmit }) => {
  return (
    <View style={styles.header}>
      <View style={{ flex: 1 }}>
        <SearchBar onSubmit={onSubmit} />
      </View>
      <CurrentLocationButton onSubmit={onSubmit} />
      <FavoritesDialog onSubmit={onSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#F5F5F5",
    padding: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
});

export default Header;
