import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { RECIPES } from "../data/dummy-data";
import CustomHeaderButton from "../components/CustomHeaderButton";

const RecipeDetailsScreen = (props) => {
  const recipeId = props.navigation.getParam("recipeId");

  const selectedRecipe = RECIPES.find((recipe) => recipe.id === recipeId);

  return (
    <View style={styles.screen}>
      <Text>{selectedRecipe.title}</Text>
      <Button
        title="Go Back to Categories"
        onPress={() => {
          props.navigation.popToTop();
        }}
      />
    </View>
  );
};

RecipeDetailsScreen.navigationOptions = (navigationData) => {
  const recipeId = navigationData.navigation.getParam("recipeId");
  const selectedRecipe = RECIPES.find((recipe) => recipe.id === recipeId);
  return {
    headerTitle: selectedRecipe.title,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Favorite"
          iconName="ios-star"
          onPress={() => {
            console.log("Favorited!");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RecipeDetailsScreen;
