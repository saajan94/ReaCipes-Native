import React from "react";
import { FlatList, View, StyleSheet } from "react-native";

import RecipeItem from "./RecipeItem";

const RecipeList = (props) => {
  const renderRecipeItem = (itemData) => {
    return (
      <RecipeItem
        title={itemData.item.title}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
        image={itemData.item.imageUrl}
        onSelectRecipe={() => {
          props.navigation.navigate({
            routeName: "RecipeDetails",
            params: {
              recipeId: itemData.item.id,
            },
          });
        }}
      />
    );
  };

  return (
    <View style={styles.list}>
      <FlatList
        style={{ width: "100%" }}
        data={props.listData}
        renderItem={renderRecipeItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RecipeList;
