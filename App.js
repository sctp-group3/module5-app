import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Platform } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import CurrentDisplay from "./components/CurrentDisplay";
import WeatherContext from "./contexts/WeatherContext";
import getUrl from "./services/weatherApi";

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [targetCity, setTargetCity] = useState(null);

  const ctx = useContext(WeatherContext);

  const fetchWeatherData = async () => {
    try {
      const searchParam = {
        ...targetCity,
        units: ctx?.isMetric ? "metric" : "imperial",
      };
      const data = await getUrl(searchParam);
      setWeatherData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (targetCity) {
      fetchWeatherData();
    }
  }, [targetCity]);

  useEffect(() => {
    console.log("weatherData :", weatherData);
  }, [weatherData]);

  const onSubmit = (item) => {
    setTargetCity(item);
    console.log("weatherData :", weatherData);
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.header}>
        <SearchBar onSubmit={onSubmit} />
      </View>
      <View style={styles.currentDisplayContainer1}>
        <View style={styles.currentDisplayContainer2}>
          {weatherData && <CurrentDisplay weather={weatherData.current} />}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b2e4f7",
    alignItems: "center",
  },
  header: {
    width: "100%",
    backgroundColor: "#466995",
    height: 120,
  },
  searchBarContainer: {
    // accounting for status bar height on android
    // Make sure searchBarContainer is on top
  },
  currentDisplayContainer1: {
    flex: 1,
    padding: 20,
    alignContent: "center",
    justifyContent: "center",
  },
  currentDisplayContainer2: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    padding: 15,
    margin: 10, // React Native uses logical pixels, you might have to adjust the padding
    backgroundColor: "#fff", // 75% white
    opacity: 0.75,
  },
});
