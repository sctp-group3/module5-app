import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import {
  Button,
  Dialog,
  Portal,
  IconButton,
  List,
  Text,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SearchBar from "./SearchBar";

const FavouritesDialog = ({ onSubmit }) => {
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const getFavourites = async () => {
      try {
        console.log("Getting favourites...");
        const jsonValue = await AsyncStorage.getItem("favourites");
        return jsonValue != null ? JSON.parse(jsonValue) : [];
      } catch (error) {
        console.log(error);
      }
    };
    getFavourites().then((data) => setFavourites(data));
  }, []);

  useEffect(() => {
    saveFavourites();
  }, [favourites]);

  const saveFavourites = async () => {
    if (!favourites) return;

    try {
      const favouritesString = JSON.stringify(favourites);
      await AsyncStorage.setItem("favourites", favouritesString);
      console.log("Favourites saved successfully.");
    } catch (error) {
      console.log("Error saving favourites:", error);
    }
  };

  const handleSelectedItem = (item) => {
    if (deleteMode) return;
    console.log("Selected item:", item);
    onSubmit(item);
    setVisible(false);
  };

  const handleAddItem = (item) => {
    setFavourites([...favourites, item]);
    hideSearch();
  };

  const handleDeleteItem = (item) => {
    const newFavourites = favourites.filter(
      (favourite) => favourite.title !== item.title
    );

    setFavourites(newFavourites);
  };

  const onButtonToggle = () => {
    setDeleteMode(!deleteMode);
  };

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const showSearch = () => {
    setDeleteMode(false);
    hideDialog();
    setSearch(true);
  };

  const hideSearch = () => {
    setSearch(false);
    showDialog();
  };

  return (
    <View>
      <IconButton icon="star" onPress={showDialog} mode="contained" />
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text variant="headlineSmall">Favourites</Text>
            </View>
          </Dialog.Title>
          <Dialog.ScrollArea style={{ maxHeight: 200 }}>
            <ScrollView>
              {favourites &&
                favourites.map((item, index) => (
                  <List.Item
                    title={item.name}
                    key={item.index}
                    description={
                      item.state
                        ? `${item.state}, ${item.country}`
                        : item.country
                    }
                    onPress={() => {
                      handleSelectedItem(item);
                    }}
                    left={(props) =>
                      deleteMode && (
                        <IconButton
                          icon="close"
                          color="red"
                          style={{ margin: 0, padding: 0 }}
                          onPress={() => {
                            handleDeleteItem(item);
                          }}
                        />
                      )
                    }
                  />
                ))}
            </ScrollView>
          </Dialog.ScrollArea>

          <Dialog.Actions>
            <Button
              mode={deleteMode ? "contained" : ""}
              onPress={onButtonToggle}
            >
              DELETE
            </Button>

            <Button onPress={showSearch}>ADD</Button>
            <Button onPress={hideDialog}>CLOSE</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Portal>
        <Dialog
          visible={search}
          style={styles.searchDialog}
          onDismiss={hideSearch}
        >
          <SearchBar onSubmit={handleAddItem} />
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  searchDialog: {
    backgroundColor: "transparent",
  },
});
export default FavouritesDialog;
