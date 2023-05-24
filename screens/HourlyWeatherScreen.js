import React, { useContext } from "react";
import { Text } from "react-native-paper";
import Screen from "../components/Screen";
import { StyleSheet, View, Image, FlatList } from "react-native";
import WeatherContext from "../contexts/WeatherContext";

const HourlyWeatherScreen = ({ weatherData }) => {
  const ctx = useContext(WeatherContext);

  return (
    <Screen>
      <Text style={styles.subtitle}>Hourly Forecast</Text>
      {weatherData && (
        <FlatList
          horizontal
          data={weatherData.hourly.list}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(hour) => {
            const weather = hour.item.weather[0];
            var dt = new Date(hour.item.dt * 1000);
            return (
              <View style={styles.hour}>
                <Text>{dt.toLocaleTimeString().replace(/:\d+ /, " ")}</Text>
                <Text>
                  {hour.item.main.temp.toFixed(1)}
                  {ctx?.isMetric ? "°C" : "°F"}
                </Text>
                <Image
                  style={styles.smallIcon}
                  source={{
                    uri: `http://openweathermap.org/img/wn/${weather.icon}@4x.png`,
                  }}
                />
                <Text>{weather.description}</Text>
              </View>
            );
          }}
        />
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 24,
    marginVertical: 12,
    marginLeft: 4,
    color: "#e96e50",
  },
  hour: {
    padding: 6,
    alignItems: "center",
  },
  smallIcon: {
    width: 100,
    height: 100,
  },
});

export default HourlyWeatherScreen;
