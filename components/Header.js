import React from "react";
import { View, StyleSheet } from "react-native";
import SearchBar from "./SearchBar";
import CurrentLocationButton from "./CurrentLocationButton";
import FavoritesDialog from "./FavouritesDialog";

const Header = ({ onSubmit, targetCity }) => {
  return (
    <View style={styles.header}>
      <View style={styles.topRow}>
        <View style={styles.searchBarContainer}>
          <SearchBar onSubmit={onSubmit} />
        </View>
        <CurrentLocationButton onSubmit={onSubmit} />
      </View>
      <View style={styles.bottomRow}>
        <FavoritesDialog onSubmit={onSubmit} targetCity={targetCity}/>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#F5F5F5",
    padding: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  bottomRow: {
    width: "100%",
  },
  searchBarContainer: {
    width: "80%",
  },
});


export default Header;
