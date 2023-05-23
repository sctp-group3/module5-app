import { StyleSheet, StatusBar } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import WeatherContext from "./contexts/WeatherContext";
import getUrl from "./services/weatherApi";
import CurrentWeatherScreen from "./screens/CurrentWeatherScreen";
import { BottomNavigation, Text, PaperProvider } from "react-native-paper";
import Header from "./components/Header";

export default function App() {
  const [index, setIndex] = React.useState(0);
  const [weatherData, setWeatherData] = useState(null);
  const [targetCity, setTargetCity] = useState(null);
  const [routes] = React.useState([
    { key: "currentWeather", title: "Current", focusedIcon: "cloud" },
    { key: "hourlyWeather", title: "Hourly", focusedIcon: "clock" },
    { key: "dailyWeather", title: "Daily", focusedIcon: "calendar" },
  ]);

  const currentWeatherRoute = () => (
    <CurrentWeatherScreen weatherData={weatherData} />
  );
  const hourlyForecastRoute = () => <Text>Hourly Forecast</Text>;

  const dailyForecastRoute = () => <Text>Daily Forecast</Text>;

  const ctx = useContext(WeatherContext);
  const renderScene = BottomNavigation.SceneMap({
    currentWeather: currentWeatherRoute,
    hourlyWeather: hourlyForecastRoute,
    dailyWeather: dailyForecastRoute,
  });
  const fetchWeatherData = async (city) => {
    try {
      const searchParam = {
        ...city,
        units: ctx?.isMetric ? "metric" : "imperial",
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
    <PaperProvider>
      <StatusBar barStyle="default" />
      <Header onSubmit={onSubmit} />
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
