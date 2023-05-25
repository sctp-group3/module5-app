import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import CurrentDisplay from "../components/CurrentDisplay";
import Screen from "../components/Screen";

const CurrentWeatherScreen = ({ weatherData, targetCity, onSubmit }) => {
  return (
    <Screen>
      <Card style={styles.container}>
        <Card.Content>
          {!weatherData && <Text>No city selected</Text>}
          {weatherData && (
            <ScrollView>
              <CurrentDisplay
                weather={weatherData.current}
                targetCity={targetCity}
                onSubmit={onSubmit}
              />
            </ScrollView>
          )}
        </Card.Content>
      </Card>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    opacity: 0.8,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CurrentWeatherScreen;
