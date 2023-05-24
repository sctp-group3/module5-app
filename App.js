import { StyleSheet, StatusBar, View } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import WeatherContext from "./contexts/WeatherContext";
import getUrl from "./services/weatherApi";
import CurrentWeatherScreen from "./screens/CurrentWeatherScreen";
import DailyWeatherScreen from "./screens/DailyWeatherScreen";
import HourlyWeatherScreen from "./screens/HourlyWeatherScreen";
import { BottomNavigation, Text, PaperProvider } from "react-native-paper";
import Header from "./components/Header";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import { WeatherProvider } from "./contexts/WeatherContext";

export default function App() {
  const [index, setIndex] = React.useState(0);
  const [weatherData, setWeatherData] = useState(null);
  const [targetCity, setTargetCity] = useState(null);
  const [routes] = React.useState([
    { key: "currentWeather", title: "Current", focusedIcon: "cloud" },
    { key: "hourlyWeather", title: "Hourly", focusedIcon: "clock" },
    { key: "dailyWeather", title: "Daily", focusedIcon: "calendar" },
  ]);

  const ctx = useContext(WeatherContext);

  const renderScene = BottomNavigation.SceneMap({
    currentWeather: () => (
      <CurrentWeatherScreen
        weatherData={weatherData}
        targetCity={targetCity}
        onSubmit={onSubmit}
      />
    ),
    hourlyWeather: () => <HourlyWeatherScreen weatherData={weatherData} />,
    dailyWeather: () => <DailyWeatherScreen weatherData={weatherData} />,
  });

  const fetchWeatherData = async (city) => {
    try {
      const searchParam = {
        ...city,
        // units: ctx?.isMetric ? "metric" : "imperial",
      };
      const data = await getUrl(searchParam);
      setWeatherData(data);
      console.log("data :", data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (targetCity) {
      console.log("item :", targetCity);
      fetchWeatherData(targetCity);
    }
  }, [targetCity]);

  const onSubmit = (item) => {
    setTargetCity(item);
  };

  return (
    <WeatherProvider>
      <AutocompleteDropdownContextProvider>
        <PaperProvider>
          <StatusBar barStyle="default" />
          <View style={styles.container}>
            <Header onSubmit={onSubmit} targetCity={targetCity} ></Header>
            <BottomNavigation
              navigationState={{ index, routes }}
              onIndexChange={setIndex}
              renderScene={renderScene}
            />
          </View>
        </PaperProvider>
      </AutocompleteDropdownContextProvider>
    </WeatherProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //Debug
    // borderColor: "red",
    // borderWidth: 2,
  },
});