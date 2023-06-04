import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import DraggableFlatList, {
  ScaleDecorator,
  RenderItemParams,
} from "react-native-draggable-flatlist";

import { mapIndexToData, Item } from "./index";

const NUM_ITEMS = 10;

const initialData: Item[] = [...Array(NUM_ITEMS)].map(mapIndexToData);

// New object with examples
const examples = {
  eatingOccasions: [
    {
      id: 1,
      EatingOccasionID: 1,
      Occasion: "Breakfast",
      Time: "08:00 AM",
      Date: "2023-06-01",
    },
    {
      id: 2,
      EatingOccasionID: 2,
      Occasion: "Lunch",
      Time: "12:30 PM",
      Date: "2023-06-01",
    },
    {
      id: 3,
      EatingOccasionID: 3,
      Occasion: "Dinner",
      Time: "07:00 PM",
      Date: "2023-06-01",
    },
  ],
  meals: [
    {
      id: 4,
      MealID: 1,
      EatingOccasionID: 1,
      MealName: "Oatmeal",
      PortionSize: "1 cup",
      CookingMethod: "Boiled",
    },
    {
      id: 5,
      MealID: 2,
      EatingOccasionID: 2,
      MealName: "Grilled Chicken Salad",
      PortionSize: "1 serving",
      CookingMethod: "Grilled",
    },
    {
      id: 6,
      MealID: 3,
      EatingOccasionID: 3,
      MealName: "Spaghetti Bolognese",
      PortionSize: "1 plate",
      CookingMethod: "Simmered",
    },
  ],
  ingredients: [
    {
      IngredientID: 1,
      MealID: 1,
      IngredientName: "Oats",
    },
    {
      IngredientID: 2,
      MealID: 2,
      IngredientName: "Chicken Breast",
    },
    {
      IngredientID: 3,
      MealID: 3,
      IngredientName: "Spaghetti",
    },
  ],
  condiments: [
    {
      CondimentID: 1,
      MealID: 1,
      CondimentName: "Honey",
    },
    {
      CondimentID: 2,
      MealID: 2,
      CondimentName: "Olive Oil",
    },
    {
      CondimentID: 3,
      MealID: 3,
      CondimentName: "Parmesan Cheese",
    },
  ],
};

export default function Basic() {
  const [data, setData] = useState(initialData);

const renderItem = ({ item, drag, isActive }: RenderItemParams<Item>) => {
  return (
    <ScaleDecorator children={undefined}>
      <TouchableOpacity
        activeOpacity={1}
        onLongPress={drag}
        disabled={isActive}
        style={[
          styles.rowItem,
          { backgroundColor: isActive ? "red" : "white", elevation: isActive ? 10 : 2 },
        ]}
      >
        <Text style={styles.text}>ID: {item.id}</Text>
        <Text style={styles.text}>Key: {item.key}</Text>
      </TouchableOpacity>
    </ScaleDecorator>
  );
};



  return (
    <DraggableFlatList
      data={data}
      onDragEnd={({ data }) => setData(data)}
      keyExtractor={(item) => item.key}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  rowItem: {
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 10,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
  text: {
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});
