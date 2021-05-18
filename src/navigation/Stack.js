import React from "react";
import { Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { connect } from "react-redux";

// Screens
import HomeScreen from "../screens/Home";
import EpubReader from "../screens/EpubReader";
import PdfReader from "../screens/PdfReader";
import Help from "../screens/Help";
import OnlineBookReader from "../screens/OnlineBookReader";

import { COLORS, ICONS } from "../res";
import { Icon } from "react-native-elements";

function UnimplementedScreen() {
  return <Text>UnimplementScreen</Text>;
}
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const screenOptions = {
  headerTitleStyle: {
    fontSize: 18,
  },
  headerShown: false,
};

const options = {
  TabNavigatorScreenOptions: ({ route }) => ({
    tabBarIcon: ({ focused, color, _ }) => {
      const size = 26;
      switch (route.name) {
        case "HomeStack":
          return focused ? (
            <ICONS.HOME color={color} size={size} />
          ) : (
            <ICONS.HOME_OUTLINE color={color} size={size} />
          );
        case "LibraryStack":
          return focused ? (
            <ICONS.LIBRARY color={color} size={size} />
          ) : (
            <ICONS.LIBRARY_OUTLINE color={color} size={size} />
          );
        case "NotificationsStack":
          return focused ? (
            <ICONS.NOTIFICATIONS color={color} size={size} />
          ) : (
            <ICONS.NOTIFICATIONS_OUTLINE color={color} size={size} />
          );
        case "SettingsStack":
          return focused ? (
            <ICONS.SETTINGS color={color} size={size} />
          ) : (
            <ICONS.SETTINGS_OUTLINE color={color} size={size} />
          );
      }
      return (
        <Icon name="help-outline" size={26} color={color} type="ionicon" />
      );
    },
  }),
  TabNavigatorTabBarOptions: {
    activeTintColor: COLORS.GOLD,
    inactiveTintColor: COLORS.GOLD,
    showLabel: false,
    tabStyle: {
      // borderTopWidth: 0.75,
    },
  },
  StackScreenMainScreenOptions: {
    headerShown: false,
  },
  StackScreenBookDetailOptions: ({ route }) => ({
    title: route.params.data.title,
  }),
};

const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        options={{ title: "App Name" }}
        name="Home"
        component={HomeScreen}
      />
    </HomeStack.Navigator>
  );
}
const LibraryStack = createStackNavigator();
function LibraryStackScreen() {
  return (
    <LibraryStack.Navigator>
      <LibraryStack.Screen name="Library" component={UnimplementedScreen} />
    </LibraryStack.Navigator>
  );
}
const NotificationStack = createStackNavigator();
function NotificationStackScreen() {
  return (
    <NotificationStack.Navigator>
      <NotificationStack.Screen
        name="Notification"
        component={UnimplementedScreen}
      />
    </NotificationStack.Navigator>
  );
}
const SettingsStack = createStackNavigator();
function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={UnimplementedScreen} />
    </SettingsStack.Navigator>
  );
}

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={options.TabNavigatorScreenOptions}
      tabBarOptions={options.TabNavigatorTabBarOptions}
    >
      <Tab.Screen name="HomeStack" component={HomeStackScreen} />
      <Tab.Screen name="LibraryStack" component={LibraryStackScreen} />
      <Tab.Screen
        name="NotificationsStack"
        component={NotificationStackScreen}
      />
      <Tab.Screen name="SettingsStack" component={SettingsStackScreen} />
    </Tab.Navigator>
  );
}

function Navigator(props) {
  const readerTitle = ({ route }) => ({
    title: route.params.title,
    headerTitleStyle: {
      fontSize: 16,
      fontFamily: "PlayfairDisplay-Bold",
      color: props.fg,
      marginRight: 25,
      marginBottom: 4,
      marginLeft: -5,
    },
    headerStyle: {
      elevation: 0,
      backgroundColor: props.bg,
    },
    headerTintColor: props.fg,
  });

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="main-screen" component={BottomTabNavigator} />
      <Stack.Screen
        name="epub-reader"
        component={EpubReader}
        options={readerTitle}
      />
      <Stack.Screen
        name="pdf-reader"
        component={PdfReader}
        options={readerTitle}
      />
      <Stack.Screen
        name="help"
        component={Help}
        options={{ headerTitle: "How to use?" }}
      />
      <Stack.Screen name="online-book-reader" component={OnlineBookReader} />
    </Stack.Navigator>
  );
}

function mapStateToProps(state) {
  return {
    bg: state.settings.bg,
    fg: state.settings.fg,
  };
}

export default connect(
  mapStateToProps,
  null
)(Navigator);
