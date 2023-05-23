import React, { Fragment, useContext } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Feather as Icon } from "@expo/vector-icons"; // or any suitable icon library
import UnitsSelector from "./UnitsSelector";
import WeatherContext from "../contexts/WeatherContext";

const CurrentDisplay = ({ weather }) => {
  const ctx = useContext(WeatherContext);
  console.log("weather :", weather);

  return (
    <View style={styles.container}>
      {weather && (
        <Fragment>
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{weather.name}</Text>
              <Text style={styles.description}>{weather.description}</Text>
            </View>
            <View style={styles.weatherContainer}>
              <Image
                source={{
                  uri: `http://openweathermap.org/img/w/${weather.icon}.png`,
                }}
                style={styles.weatherIcon}
              />
              <View style={styles.temperatureContainer}>
                <Text style={styles.temperature}>
                  {weather.temp.toFixed(1)}
                </Text>
                {/* <UnitsSelector /> */}
              </View>
            </View>
          </View>
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Icon name="arrow-up" style={styles.detailIcon} />
                <Text style={styles.detailText}>
                  High: {weather.temp_max.toFixed(1)}{" "}
                  {ctx?.isMetric ? "°C" : "°F"}
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Icon name="arrow-down" style={styles.detailIcon} />
                <Text style={styles.detailText}>
                  Low: {weather.temp_min.toFixed(1)}{" "}
                  {ctx?.isMetric ? "°C" : "°F"}
                </Text>
              </View>
            </View>
            <View style={styles.detailItem}>
              <Icon name="thermometer" style={styles.detailIcon} />
              <Text style={styles.detailText}>
                Feels like {weather.feels_like.toFixed(1)}{" "}
                {ctx?.isMetric ? "°C" : "°F"}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Icon name="wind" style={styles.detailIcon} />
              <Text style={styles.detailText}>
                Wind {weather.speed.toFixed(1)} {ctx?.isMetric ? "m/s" : "ft/s"}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Icon name="droplet" style={styles.detailIcon} />
              <Text style={styles.detailText}>
                Humidity: {weather.humidity.toFixed(1)}%
              </Text>
            </View>
          </View>
        </Fragment>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
  },
  titleContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "blue",
  },
  description: {
    fontSize: 14,
    fontWeight: "normal",
    color: "blue",
  },
  weatherContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  weatherIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  temperatureContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  temperature: {
    fontSize: 60,
    fontWeight: "normal",
    marginRight: 5,
  },
  detailsContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    padding: 10,
  },
  detailIcon: {
    fontSize: 20,
    marginRight: 5,
  },
  detailText: {
    fontSize: 14,
    fontWeight: "normal",
  },
});

export default CurrentDisplay;
