import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import CurrentDisplay from "../components/CurrentDisplay";
import Screen from "../components/Screen";
import * as Animatable from "react-native-animatable";

const CurrentWeatherScreen = ({ weatherData, targetCity, onSubmit }) => {
  return (
    <Screen>
      <Card style={styles.container}>
        <Animatable.View animation="fadeInRight" duration={300} delay={100}>
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
        </Animatable.View>
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
