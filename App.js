import { StatusBar } from "expo-status-bar";
import { StyleSheet, ScrollView, View, Platform } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import CurrentDisplay from "./components/CurrentDisplay";
import WeatherContext from "./contexts/WeatherContext";
import getUrl from "./services/weatherApi";
import { LinearGradient } from "expo-linear-gradient";

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
    <LinearGradient
      colors={["#3B82F6", "#06B6D4"]}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <StatusBar />
      <View style={styles.header}>
        <SearchBar onSubmit={onSubmit} />
      </View>
      <View style={styles.currentDisplayContainer}>
        <ScrollView>
          {weatherData && <CurrentDisplay weather={weatherData.current} />}
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 10,
  },
  header: {
    width: "100%",
    height: 120,
  },
  searchBarContainer: {
    // accounting for status bar height on android
    // Make sure searchBarContainer is on top
  },
  currentDisplayContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    padding: 35,
    margin: 10, // React Native uses logical pixels, you might have to adjust the padding
    backgroundColor: "#fff", // 75% white
    opacity: 0.75,
  },
});
