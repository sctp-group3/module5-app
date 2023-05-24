import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import SearchBar from "./SearchBar";
import CurrentLocationButton from "./CurrentLocationButton";
import FavoritesDialog from "./FavouritesDialog";
import WeatherContext from "../contexts/WeatherContext";

const Header = ({ onSubmit }) => {
  const ctx = useContext(WeatherContext);

  const handleSubmit = (item) => {
    const itemUnitOverride = {
      ...item,
      units: ctx.isMetric ? "metric" : "imperial",
    };
    onSubmit(itemUnitOverride);
  };

  return (
    <View style={styles.header}>
      <View style={{ flex: 1 }}>
        <SearchBar onSubmit={handleSubmit} />
      </View>
      <CurrentLocationButton onSubmit={handleSubmit} />
      <FavoritesDialog onSubmit={handleSubmit} />
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
