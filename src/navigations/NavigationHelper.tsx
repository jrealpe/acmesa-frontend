import React from "react";
import { Text } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import { StackNavigationOptions } from "@react-navigation/stack";
import { DrawerNavigationOptions } from "@react-navigation/drawer";

import NavigationNames from "./NavigationNames";
import { Theme } from "../theme";

const getTabTitle = (routeName: string): string => {
  if (routeName === NavigationNames.UserTab) {
    return "Usuarios";
  } else if (routeName === NavigationNames.RoleTab) {
    return "Roles";
  } else if (routeName === NavigationNames.ApplicationTab) {
    return "Aplicaciones";
  }
 
  return "";
};

export const tabScreenOptions: (props: {
  route: RouteProp<ParamListBase, keyof ParamListBase>;
  navigation: any;
}) => DrawerNavigationOptions = ({ route }) => ({
  title: getTabTitle(route.name),
  tabBarIcon: ({ focused, color, size }) => {
    let iconName = "";
    switch (route.name) {
      case NavigationNames.UserTab:
        iconName = "ios-home";
        break;
      case NavigationNames.RoleTab:
        iconName = "ios-home";
        break;
      case NavigationNames.ApplicationTab:
        iconName = "ios-home";
        break;
    }
    return <Ionicons name={iconName} size={28} color={color} />;
  }
});

export const stackScreenOptions: StackNavigationOptions = {
  headerTitleStyle: { color: Theme.colors.black },
  headerTintColor: Theme.colors.black,
  headerTitleAlign: "center",
  headerBackTitleVisible: false,
  cardStyle: {
    backgroundColor: "white"
  }
};
