import { IconButton } from "react-native-paper";
import * as Location from "expo-location";
import React from "react";

const CurrentLocationButton = ({ onSubmit }) => {
  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      return location;
    } catch (error) {
      alert("Error getting location " + error);
    }
  };

  const handlePress = async () => {
    try {
      const location = await getCurrentLocation();
      const city = {
        lng: location.coords.longitude,
        lat: location.coords.latitude,
      };

      onSubmit(city);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <IconButton icon="crosshairs-gps" onPress={handlePress} mode="contained" />
  );
};

export default CurrentLocationButton;
