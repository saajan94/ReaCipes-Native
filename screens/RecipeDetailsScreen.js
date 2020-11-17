import React, { useEffect, useCallback } from "react";
import {
  ScrollView,
  Image,
  View,
  Text,
  Button,
  StyleSheet,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import CustomHeaderButton from "../components/CustomHeaderButton";
import DefaultText from "../components/DefaultText";
import { toggleFavorite } from "../store/actions/recipes";

const ListItem = (props) => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};

const RecipeDetailsScreen = (props) => {
  const availableRecipes = useSelector((state) => state.recipes.recipes);
  const recipeId = props.navigation.getParam("recipeId");
  const currentRecipeIsFav = useSelector((state) =>
    state.recipes.favoriteRecipes.some((recipe) => recipe.id === recipeId)
  );

  const selectedRecipe = availableRecipes.find(
    (recipe) => recipe.id === recipeId
  );

  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(recipeId));
  }, [dispatch, recipeId]);

  useEffect(() => {
    // props.navigation.setParams({
    //   recipeTitle: selectedRecipe.title,
    // });
    props.navigation.setParams({
      toggleFav: toggleFavoriteHandler,
    });
  }, [toggleFavoriteHandler]);

  useEffect(() => {
    props.navigation.setParams({
      isFav: currentRecipeIsFav,
    });
  }, [currentRecipeIsFav]);

  return (
    <ScrollView>
      <Image source={{ uri: selectedRecipe.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{selectedRecipe.duration} min.</DefaultText>
        <DefaultText>{selectedRecipe.complexity}</DefaultText>
        <DefaultText>{selectedRecipe.affordability}</DefaultText>
      </View>
      <View
        style={{
          borderBottomColor: "black",
          borderBottomWidth: 0.2,
          width: 370,
          alignSelf: "center",
        }}
      />
      <Text style={styles.title}>Ingredients</Text>
      {selectedRecipe.ingredients.map((ingredient) => (
        <ListItem key={ingredient}>{ingredient}</ListItem>
      ))}
      <Text style={styles.title}>Instructions</Text>
      {selectedRecipe.steps.map((step) => (
        <ListItem key={step}>{step}</ListItem>
      ))}
      <View style={styles.screen}>
        <Button
          title="Go Back to Categories"
          onPress={() => {
            props.navigation.popToTop();
          }}
        />
      </View>
    </ScrollView>
  );
};

RecipeDetailsScreen.navigationOptions = (navigationData) => {
  // const recipeId = navigationData.navigation.getParam("recipeId");
  const recipeTitle = navigationData.navigation.getParam("recipeTitle");
  const toggleFavorite = navigationData.navigation.getParam("toggleFav");
  const isFavorite = navigationData.navigation.getParam("isFav");
  // const selectedRecipe = RECIPES.find((recipe) => recipe.id === recipeId);

  return {
    headerTitle: recipeTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Favorite"
          iconName={isFavorite ? "ios-star" : "ios-star-outline"}
          onPress={toggleFavorite}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  details: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    textAlign: "center",
    marginTop: 13,
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});

export default RecipeDetailsScreen;
