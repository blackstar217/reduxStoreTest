import React from "react";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import SearchScreen from "../screens/searchScreen";
import HomeScreen from "../screens/homeScreen";

const TabNavigator = createBottomTabNavigator({
  searchScreen: SearchScreen,
  home: HomeScreen
});

export default createAppContainer(TabNavigator);
