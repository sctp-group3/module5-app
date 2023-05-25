import React, { useState, useContext, Fragment, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import cityData from "../data/cities.json";
import WeatherContext from "../contexts/WeatherContext";
import { IconButton, Text } from "react-native-paper";

const SearchBar = ({ onSubmit, favourites, addFavourite, deleteFavourite }) => {
  const [suggestionsList, setSuggestionsList] = useState([]);
  const ctx = useContext(WeatherContext);

  const citiesList = cityData.map((item, index) => ({
    id: index,
    title:
      item.name + (item.state ? ", " + item.state : "") + ", " + item.country,
    ...item,
  }));

  useEffect(() => {
    setSuggestionsList(citiesList);
  }, []);

  const handleSelectedItem = (item) => {
    if (!item) {
      return;
    }
    setSuggestionsList([]);
    onSubmit({ ...item, units: ctx.isMetric ? "metric" : "imperial" });
  };

  const handleFavorite = async (item) => {
    try {
      if (favourites.some((favItem) => favItem.id === item.id)) {
        await deleteFavourite(item);
      } else {
        await addFavourite(item);
      }
    } catch (error) {
      console.error("Error performing favorite action:", error);
      // Handle error if needed
    }
  };

  const renderItem = (item) => {
    const isFavorite = favourites.some((favItem) => favItem.id === item.id);

    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemTextContainer}>
          <Text numberOfLines={2}>{item.title}</Text>
        </View>
        <IconButton
          icon={isFavorite ? "star" : "star-outline"}
          size={20}
          style={{ margin: 0 }}
          onPress={() => handleFavorite(item)}
        />
      </View>
    );
  };

  return (
    <AutocompleteDropdown
      clearOnFocus={false}
      closeOnBlur={true}
      closeOnSubmit={true}
      onSelectItem={handleSelectedItem}
      renderItem={renderItem}
      textInputProps={{
        placeholder: "Search for a city...",
        placeholderTextColor: "#a1a1a1",
      }}
      dataSet={suggestionsList}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemTextContainer: {
    flex: 1,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 0,
  },
  emptyResultContainer: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
});

export default SearchBar;
