import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import WeatherContext from "../contexts/WeatherContext";

function UnitsSelector({ targetCity, onSubmit }) {
  // const [activeUnits, setActiveUnits] = useState('metric');
  const ctx = useContext(WeatherContext);

  const handleClick = (selectedUnits) => {
    ctx.handleChangeUnits(selectedUnits);
    onSubmit({ ...targetCity, units: selectedUnits });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, !ctx.isMetric ? styles.activeButton : null]}
        onPress={() => handleClick("imperial")}
      >
        <Text style={styles.buttonText}>°F</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, ctx.isMetric ? styles.activeButton : null]}
        onPress={() => handleClick("metric")}
      >
        <Text style={styles.buttonText}>°C</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    opacity: 0.8,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
  },
  activeButton: {
    backgroundColor: "#0058a3",
  },
  buttonText: {
    fontSize: 18,
    color: "white",
  },
});
export default UnitsSelector;
