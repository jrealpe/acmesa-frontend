import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import NavigationNames from "./NavigationNames";
import { stackScreenOptions, tabScreenOptions } from "./NavigationHelper";
import { UserListScreen, UserDetailScreen, RoleListScreen, RoleDetailScreen, ApplicationListScreen, ApplicationDetailScreen } from "../screens";
import { ToolbarBrandLogo, ToolbarMenu } from "../components";
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
          headerLeft: () => <ToolbarMenu />,
          headerTitle: () => <ToolbarBrandLogo />
        }}
      />

      <Stack.Screen
        name={NavigationNames.UserDetailScreen}
        component={UserDetailScreen}
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
          headerLeft: () => <ToolbarMenu />,
          headerTitle: () => <ToolbarBrandLogo />
        }}
      />

      <Stack.Screen
        name={NavigationNames.RoleDetailScreen}
        component={RoleDetailScreen}
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
          headerLeft: () => <ToolbarMenu />,
          headerTitle: () => <ToolbarBrandLogo />
        }}
      />

      <Stack.Screen
        name={NavigationNames.ApplicationDetailScreen}
        component={ApplicationDetailScreen}
        options={{
          headerTitle: () => <ToolbarBrandLogo />
        }}
      />
    </Stack.Navigator>
  );
};

const MainTabNavigator = () => (
  <Tab.Navigator
    screenOptions={tabScreenOptions}
    tabBarOptions={{
      activeTintColor: Theme.colors.primaryColor,
      inactiveTintColor: Theme.colors.gray
    }}
  >
    <Tab.Screen name={NavigationNames.UserTab} component={UserTabStack} />
    <Tab.Screen name={NavigationNames.RoleTab} component={RoleTabStack} />
    <Tab.Screen name={NavigationNames.ApplicationTab} component={ApplicationTabStack} />
  </Tab.Navigator>
);

export default MainTabNavigator;
