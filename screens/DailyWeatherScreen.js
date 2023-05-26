import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import DailyDisplay from "../components/DailyDisplay";
import Screen from "../components/Screen";
import * as Animatable from "react-native-animatable";

const DailyWeatherScreen = ({ weatherData }) => {
  const firstRow = weatherData?.daily?.list?.slice(0, 3);
  const secondRow = weatherData?.daily?.list?.slice(3, 6);
  //console.log(weatherData);

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.subtitle}>Daily Forecast</Text>
        <Card>
          <Card.Content>
            {!weatherData && <Text>No city selected</Text>}
            {weatherData && (
              <View>
                <View style={styles.row}>
                  {firstRow.map((day, index) => (
                    <DailyDisplay day={day} index={index} key={day.dt} />
                  ))}
                </View>
                <View style={styles.row}>
                  {secondRow.map((day, index) => (
                    <DailyDisplay day={day} index={index} key={day.dt} />
                  ))}
                </View>
              </View>
            )}
          </Card.Content>
        </Card>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    // Add this style to center the subtitle and container
    alignItems: "center",
  },
  container: {
    opacity: 0.8,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center", // Add this if the container itself is not centered
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center", // Add this if the rows themselves are not centered
    marginBottom: 10,
  },
  subtitle: {
    // Add this style for the subtitle
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
});

export default DailyWeatherScreen;
