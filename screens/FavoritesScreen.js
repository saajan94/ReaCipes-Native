import React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../components/CustomHeaderButton";
import RecipeList from "../components/RecipeList";
import { RECIPES } from "../data/dummy-data";

const FavoritesScreen = (props) => {
  const favRecipes = RECIPES.filter(
    (recipe) => recipe.id === "m1" || recipe.id === "m2"
  );
  return <RecipeList listData={favRecipes} navigation={props.navigation} />;
};

FavoritesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Favorite Recipes",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default FavoritesScreen;
