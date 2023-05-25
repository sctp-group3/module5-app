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

const FavouritesDialog = ({ onSubmit, deleteFavourites, favourites }) => {
  const [visible, setVisible] = useState(false);
  const [inDeleteMode, setInDeleteMode] = useState(false);

  const handleSelectedItem = (item) => {
    if (inDeleteMode) return;
    onSubmit(item);
    setVisible(false);
  };

  const onButtonToggle = () => {
    setInDeleteMode(!inDeleteMode);
  };

  const showDialog = () => setVisible(true);
  const hideDialog = () => {
    setInDeleteMode(false);
    setVisible(false);
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
                favourites.map((item) => (
                  <List.Item
                    title={item.name}
                    key={item.title}
                    description={
                      item.state
                        ? `${item.state}, ${item.country}`
                        : item.country
                    }
                    onPress={() => {
                      handleSelectedItem(item);
                    }}
                    left={(props) =>
                      inDeleteMode && (
                        <IconButton
                          icon="close"
                          color="red"
                          style={{ margin: 0, padding: 0 }}
                          onPress={() => {
                            deleteFavourites(item);
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
              mode={inDeleteMode ? "contained" : ""}
              onPress={onButtonToggle}
              style={{ borderRadius: 10 }}
            >
              DELETE
            </Button>
            <Button onPress={hideDialog}>CLOSE</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({});
export default FavouritesDialog;
