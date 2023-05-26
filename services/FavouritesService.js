import AsyncStorage from "@react-native-async-storage/async-storage";

export const getFavourites = async (callback) => {
  try {
    // console.log("Getting favourites...");
    const jsonValue = await AsyncStorage.getItem("favourites");
    const data = jsonValue != null ? JSON.parse(jsonValue) : [];
    callback(data);
  } catch (error) {
    console.log(error);
  }
};

export const saveFavourites = async (favourites) => {
  if (!favourites) {
    console.log("No favourites to save.");
    return;
  }

  try {
    const favouritesString = JSON.stringify(favourites);
    await AsyncStorage.setItem("favourites", favouritesString);
    // console.log("Favourites saved successfully.");
  } catch (error) {
    console.log("Error saving favourites:", error);
  }
};
