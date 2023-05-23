import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import cityData from "../data/cities.json";
import { Ionicons } from "@expo/vector-icons";
import WeatherContext from "../contexts/WeatherContext";

const SearchBar = ({ onSubmit }) => {
  const [suggestionsList, setSuggestionsList] = useState([]);
  const ctx = useContext(WeatherContext);
  const filterData = (query) => {
    if (!query) {
      return [];
    }

    const filteredCities = cityData.filter((city) => {
      return city.name.toLowerCase().includes(query.toLowerCase());
    });
    return filteredCities;
  };

  const handleTextChange = (text) => {
    const suggestions = filterData(text).map((item, index) => ({
      id: index,
      title:
        item.name + (item.state ? ", " + item.state : "") + ", " + item.country,
      ...item,
    }));

    setSuggestionsList(suggestions);
  };

  const handleSelectedItem = (item) => {
    if (!item) {
      return;
    }
    setSuggestionsList([]);
    onSubmit({ ...item, units: ctx.isMetric ? "metric" : "imperial" });
  };

  return (
    <AutocompleteDropdown
      clearOnFocus={false}
      closeOnBlur={true}
      closeOnSubmit={false}
      onSelectItem={handleSelectedItem}
      onChangeText={handleTextChange}
      textInputProps={{
        placeholder: "Search for a city...",
        placeholderTextColor: "#a1a1a1",
      }}
      dataSet={suggestionsList}
    />
  );
};

const styles = StyleSheet.create({});

export default SearchBar;
