import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import NavigationNames from "./NavigationNames";
import { stackScreenOptions, tabScreenOptions } from "./NavigationHelper";
import { UserListScreen, RoleListScreen, ApplicationScreen } from "../screens";
import { ToolbarBrandLogo } from "../components";
import { Theme } from "../theme";

const Stack = createStackNavigator();
const Tab = createDrawerNavigator();

const UserTabStack = () => {
  return (
    <Stack.Navigator headerMode="screen" screenOptions={stackScreenOptions}>
      <Stack.Screen
        name={NavigationNames.UserListScreen}
        component={UserListScreen}
        options={{
          headerTitle: () => <ToolbarBrandLogo />
        }}
      />
    </Stack.Navigator>
  );
};

const RoleTabStack = () => {
  return (
    <Stack.Navigator headerMode="screen" screenOptions={stackScreenOptions}>
      <Stack.Screen
        name={NavigationNames.RoleListScreen}
        component={RoleListScreen}
        options={{
          headerTitle: () => <ToolbarBrandLogo />
        }}
      />
    </Stack.Navigator>
  );
};

const ApplicationTabStack = () => {
  return (
    <Stack.Navigator headerMode="screen" screenOptions={stackScreenOptions}>
      <Stack.Screen
        name={NavigationNames.ApplicationListScreen}
        component={ApplicationListScreen}
        options={{
          headerTitle: () => <ToolbarBrandLogo />
        }}
      />
    </Stack.Navigator>
  );
};

const MainTabNavigator = () => (
  <Tab.Navigator
    openByDefault
    screenOptions={tabScreenOptions}
    tabBarOptions={{
      activeTintColor: Theme.colors.primaryColor,
      inactiveTintColor: Theme.colors.gray
    }}
  >


  </Tab.Navigator>
);

export default MainTabNavigator;
