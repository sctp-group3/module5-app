import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import SearchBar from "./SearchBar";
import CurrentLocationButton from "./CurrentLocationButton";
import FavouritesDialog from "./FavouritesDialog";
import WeatherContext from "../contexts/WeatherContext";
import { getFavourites, saveFavourites } from "../services/FavouritesService";

const Header = ({ onSubmit }) => {
  const [favourites, setFavourites] = useState([]);
  const ctx = useContext(WeatherContext);

  useEffect(() => {
    getFavourites(setFavourites);
  }, []);

  useEffect(() => {
    if (favourites && favourites.length > 0) saveFavourites(favourites);
  }, [favourites]);

  const handleSubmit = (item) => {
    const itemUnitOverride = {
      ...item,
      units: ctx.isMetric ? "metric" : "imperial",
    };
    onSubmit(itemUnitOverride);
  };

  const handleDeleteFavourite = (item) => {
    const newFavourites = favourites.filter(
      (favourite) => favourite.id !== item.id
    );
    setFavourites(newFavourites);
  };

  const handleAddFavourite = (item) => {
    console.log("Adding favourite...");
    setFavourites([...favourites, item]);
  };

  return (
    <View style={styles.header}>
      <View style={{ flex: 1 }}>
        <SearchBar
          onSubmit={handleSubmit}
          favourites={favourites}
          addFavourite={handleAddFavourite}
          deleteFavourite={handleDeleteFavourite}
        />
      </View>
      <CurrentLocationButton onSubmit={handleSubmit} />
      <FavouritesDialog
        onSubmit={handleSubmit}
        favourites={favourites}
        deleteFavourites={handleDeleteFavourite}
      />
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
