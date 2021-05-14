/** import node_modules */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';

/** import absolute path */
import HomeScreen from 'src/components/screens/HomeScreen';
import LibraryScreen from 'src/components/screens/LibraryScreen';
import NotificationsScreen from 'src/components/screens/NotificationsScreen';
import SettingsScreen from 'src/components/screens/SettingsScreen';
import BookDetailScreen from 'src/components/screens/BookDetailScreen';

import { COLORS, ICONS } from 'src/res';

const options = {
  TabNavigatorScreenOptions: ({ route }) => ({
    tabBarIcon: ({ focused, color, _ }) => {
      const size = 26;
      switch (route.name) {
        case 'Home':
          return focused
            ? ICONS.HOME({ color, size })
            : ICONS.HOME_OUTLINE({ color, size });
        case 'Library':
          return focused
            ? ICONS.LIBRARY({ color, size })
            : ICONS.LIBRARY_OUTLINE({ color, size });
        case 'Notifications':
          return focused
            ? ICONS.NOTIFICATIONS({ color, size })
            : ICONS.NOTIFICATIONS_OUTLINE({ color, size });
        case 'Settings':
          return focused
            ? ICONS.SETTINGS({ color, size })
            : ICONS.SETTINGS_OUTLINE({ color, size });
      }
      return (
        <Icon name="help-outline" size={26} color={color} type="ionicon" />
      );
    },
  }),
  TabNavigatorTabBarOptions: {
    activeTintColor: COLORS.GREEN,
    inactiveTintColor: COLORS.GREEN,
    showLabel: false,
    tabStyle: { backgroundColor: COLORS.LIGHT },
  },
  StackScreenMainScreenOptions: {
    headerShown: false,
  },
  StackScreenBookDetailOptions: ({ route }) => ({
    title: route.params.data.title,
  }),
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={options.TabNavigatorScreenOptions}
      tabBarOptions={options.TabNavigatorTabBarOptions}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Library" component={LibraryScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={options.StackScreenMainScreenOptions}
        name="MainScreen"
        component={TabNavigator}
      />
      <Stack.Screen
        options={options.StackScreenBookDetailOptions}
        name="BookDetail"
        component={BookDetailScreen}
      />
    </Stack.Navigator>
  );
}

export default function BottomTabNavigator() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
