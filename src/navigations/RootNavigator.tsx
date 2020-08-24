import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import MainTabNavigator from "./MainTabNavigator";
import NavigationNames from "./NavigationNames";

const Stack = createStackNavigator();

export default function() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={"Root"} component={MainTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
