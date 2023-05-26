import React, { useContext } from "react";
import { Card, Text } from "react-native-paper";
import Screen from "../components/Screen";
import { StyleSheet, View, Image, FlatList } from "react-native";
import WeatherContext from "../contexts/WeatherContext";

const HourlyWeatherScreen = ({ weatherData }) => {
  const ctx = useContext(WeatherContext);

  if (weatherData) {
    var sunrise = new Date(weatherData.hourly.city.sunrise * 1000);
    sunrise = sunrise.toLocaleTimeString().replace(/:\d+ /, " ");

    var sunset = new Date(weatherData.hourly.city.sunset * 1000);
    sunset = sunset.toLocaleTimeString().replace(/:\d+ /, " ");
  }
  return (
    <Screen>
      <Card style={styles.container}>
        {weatherData && (
          <Card.Content>
            <Text style={styles.title}>Hourly Forecast</Text>
            {weatherData && (
              <View>
                <FlatList
                  horizontal
                  data={weatherData.hourly.list}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={(hour) => {
                    const weather = hour.item.weather[0];
                    var dt = new Date(hour.item.dt * 1000);
                    return (
                      <View style={styles.hour}>
                        <Text>
                          {dt.toLocaleTimeString().replace(/:\d+ /, " ")}
                        </Text>
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
                <Text style={styles.subtitle}>Sunrise</Text>
                <Text style={styles.subtitle2}>🌅 {sunrise}</Text>
                <Text style={styles.subtitle}>Sunset</Text>
                <Text style={styles.subtitle2}>🌇 {sunset}</Text>
              </View>
            )}
          </Card.Content>
        )}
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
    alignSelf: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "blue",
    marginBottom: 20,
    alignSelf: "center",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "blue",
    marginTop: 30,
    alignSelf: "center",
  },
  subtitle2: {
    marginTop: 20,
    alignSelf: "center",
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
