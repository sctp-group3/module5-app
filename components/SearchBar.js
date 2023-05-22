import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import AutocompleteInput from "react-native-autocomplete-input";
import cityData from "../data/cities.json";

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const filterData = (query) => {
    if (!query) {
      return [];
    }

    const filteredCities = cityData.filter((city) => {
      const cityLowerCase = city.name.toLowerCase();
      const queryLowerCase = query.toLowerCase();
      return cityLowerCase.includes(queryLowerCase);
    });
    return filteredCities;
  };

  const handleTextChange = (text) => {
    setQuery(text);
    setSuggestions(filterData(text));
  };

  const onItemSelect = (item) => {
    setQuery(item.name);
    setSuggestions([]);
    onSubmit(item);
  };

  const renderItem = ({ item }) => {
    return (
      <Pressable onPress={() => onItemSelect(item)}>
        <Text style={styles.suggestionItem}>
          {item.name + ", " + item.state + ", " + item.country}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.autocompleteContainer}>
      <AutocompleteInput
        data={suggestions}
        value={query}
        listContainerStyle={styles.suggestionListContainer}
        onChangeText={handleTextChange}
        flatListProps={{
          style: styles.suggestionList,
          keyExtractor: (_, idx) => idx,
          renderItem: renderItem,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  autocompleteContainer: {
    flex: 1,
    margin: 50,
    width: "80%",
    padding: 5,
    fontSize: 16,
  },
  textContainer: {
    padding: 5,
  },

  suggestionItem: {
    margin: 0,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  suggestionList: {
    width: "100%",
    margin: 0,
    marginTop: 1,
    elevation: 2,
    padding: 0,
    maxHeight: 300,
    // Ensure SearchBar is on top
  },
});

export default SearchBar;
