import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import {
  Text,
  Button,
  Dialog,
  Portal
} from "react-native-paper";

const FavoritesDialog = ({ onSubmit, targetCity }) => {
  const [favorites, setFavorites] = useState([]);
  const [showDialog, setShowDialog] = useState(false);

  const handleLocationClick = (location) => {
    onSubmit(location);
  };

  const addToFavorites = () => {
    if (targetCity && !favorites.includes(targetCity)) {
      setFavorites((prevFavorites) => [...prevFavorites, targetCity]);
    }
  };

  const handleDelete = (location) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((favorite) => favorite !== location)
    );
  };

  const openDialog = () => {
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  return (
    <View style={styles.container}>
      <Button icon="star" onPress={openDialog}>
        Favorites
      </Button>
      <Portal>
        <Dialog visible={showDialog} onDismiss={closeDialog}>
          <Dialog.Title>Favorites</Dialog.Title>
          <Dialog.Content>
            {favorites.length === 0 ? (
              <Text>No saved locations</Text>
            ) : (
              favorites.map((location) => (
                <View key={location.name} style={styles.favoriteItem}>
                  <Text onPress={() => handleLocationClick(location)}>
                    {location.name}
                  </Text>
                  <Button
                    icon="close"
                    onPress={() => handleDelete(location)}
                    compact={true}
                    style={styles.deleteButton}
                  />
                </View>
              ))
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={addToFavorites}>Add</Button>
            <Button onPress={closeDialog}>Close</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  favoriteItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  deleteButton: {
    marginRight:150,
  },
});

export default FavoritesDialog;
