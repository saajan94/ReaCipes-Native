import React from "react";
import { View, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";

import CustomHeaderButton from "../components/CustomHeaderButton";
import RecipeList from "../components/RecipeList";
import DefaultText from "../components/DefaultText";

const FavoritesScreen = (props) => {
  const favRecipes = useSelector((state) => state.recipes.favoriteRecipes);

  if (favRecipes.length === 0 || !favRecipes) {
    return (
      <View style={styles.content}>
        <DefaultText>No favorite recipes found. Start adding some!</DefaultText>
      </View>
    );
  }

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

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FavoritesScreen;
