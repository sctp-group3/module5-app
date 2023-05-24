import React, { useContext } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import WeatherContext from "../contexts/WeatherContext";
import moment from 'moment';

const DailyDisplay = ({ day, index }) => {
  const ctx = useContext(WeatherContext);

  return (
    <View style={styles.dayContainer}>
      <Text style={styles.weekDay}>{moment(day.dt * 1000).format("ddd")}</Text>
      <Text style={styles.date}>{moment(day.dt * 1000).format("DD/MM")}</Text>
      <Image
        source={{
          uri: `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`,
        }}
        resizeMode={"contain"} 
        style={styles.weatherIcon}
      />
      <Text style={styles.degree}>{Math.round(day.temp.max)}°F</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  dayContainer: {
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderRadius: 10,
    margin: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    width: "30%",
  },
  weekDay: {
    fontSize: 18,
    textAlign: "center",
  },
  date: {
    fontSize: 16,
    textAlign: "center",
  },
  weatherIcon: {
    width: 50,
    height: 50,
  },
  degree: {
    fontSize: 18,
  },
});

export default DailyDisplay;


