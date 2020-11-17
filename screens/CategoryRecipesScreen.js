import React from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import { CATEGORIES } from "../data/dummy-data";
import RecipeList from "../components/RecipeList";
import DefaultText from "../components/DefaultText";

const CategoryRecipesScreen = (props) => {
  const catId = props.navigation.getParam("categoryId");

  const availableRecipes = useSelector(
    (state) => state.recipes.filteredRecipes
  );

  const displayedRecipes = availableRecipes.filter(
    (recipe) => recipe.categoryIds.indexOf(catId) >= 0
  );

  if (displayedRecipes.length === 0) {
    return (
      <View style={styles.content}>
        <DefaultText>No meals found, try checking your filters?</DefaultText>
      </View>
    );
  }

  return (
    <RecipeList listData={displayedRecipes} navigation={props.navigation} />
  );
};

CategoryRecipesScreen.navigationOptions = (navigationData) => {
  const catId = navigationData.navigation.getParam("categoryId");

  const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);

  return {
    headerTitle: selectedCategory.title,
  };
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CategoryRecipesScreen;
