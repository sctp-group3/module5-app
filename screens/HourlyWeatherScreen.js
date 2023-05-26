import React, { useContext } from "react";
import { Card, Text } from "react-native-paper";
import Screen from "../components/Screen";
import { StyleSheet, View, Image, FlatList } from "react-native";
import WeatherContext from "../contexts/WeatherContext";

const HourlyWeatherScreen = ({ weatherData }) => {
  const ctx = useContext(WeatherContext);

  const renderItem = (hour) => {
    const weather = hour.item.weather[0];
    var dt = new Date(hour.item.dt * 1000);
    const time = dt.toLocaleTimeString().replace(/:\d+ /, " ");
    return (
      <Card style={styles.itemContainer}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 10,
          }}
        >
          <Text style={{ padding: 5 }} variant="titleMedium">
            {time}
          </Text>
          <Text style={{ padding: 5 }} variant="titleSmall">
            {hour.item.main.temp.toFixed(1)}
            {ctx?.isMetric ? "°C" : "°F"}
          </Text>
          <Image
            style={styles.smallIcon}
            source={{
              uri: `http://openweathermap.org/img/wn/${weather.icon}@4x.png`,
            }}
          />
          <Text style={{ padding: 5 }}>{weather.description}</Text>
        </View>
      </Card>
    );
  };

  return (
    <Screen>
      <Card style={styles.container}>
        <Text variant="headlineSmall" style={{ padding: 10 }}>
          Hourly Forecast
        </Text>
        {weatherData && (
          <FlatList
            style={styles.list}
            data={weatherData.hourly.list}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
        )}
      </Card>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    opacity: 0.8,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 15,
  },

  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    opacity: 0.8,
    padding: 10,
    margin: 5,
  },

  smallIcon: {
    width: 50,
    height: 50,
  },
});

export default HourlyWeatherScreen;
