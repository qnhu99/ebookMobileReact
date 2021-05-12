import React from "react";
import { Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { connect } from "react-redux";
import Home from "../screens/Home";
import EpubReader from "../screens/EpubReader";
import PdfReader from "../screens/PdfReader";
import Help from "../screens/Help";

import Icon from "../components/Icon";

import { COLORS, ICONS } from "../res";

const Stack = createStackNavigator();

const screenOptions = {
  headerTitleStyle: {
    fontSize: 18,
  },
};

const Tab = createBottomTabNavigator();

const options = {
  TabNavigatorScreenOptions: ({ route }) => ({
    tabBarIcon: ({ focused, color, _ }) => {
      const size = 26;
      switch (route.name) {
        case "Home":
          return focused ? (
            <Icon name="home" type="feather" color="red" size={28} />
          ) : (
            <Icon name="home" type="feather" color="yellow" size={28} />
          );
        case "Library":
          return focused
            ? ICONS.LIBRARY({ color, size })
            : ICONS.LIBRARY_OUTLINE({ color, size });
        case "Notifications":
          return focused
            ? ICONS.NOTIFICATIONS({ color, size })
            : ICONS.NOTIFICATIONS_OUTLINE({ color, size });
        case "Settings":
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
    activeTintColor: COLORS.GOLD,
    inactiveTintColor: COLORS.GOLD,
    showLabel: false,
    tabStyle: {
      borderTopWidth: 0.75,
    },
  },
  StackScreenMainScreenOptions: {
    headerShown: false,
  },
  StackScreenBookDetailOptions: ({ route }) => ({
    title: route.params.data.title,
  }),
};

function UnimplementScreen() {
  return <Text>UnimplementScreen</Text>;
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={options.TabNavigatorScreenOptions}
      tabBarOptions={options.TabNavigatorTabBarOptions}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Library" component={UnimplementScreen} />
      <Tab.Screen name="Notifications" component={UnimplementScreen} />
      <Tab.Screen name="Settings" component={UnimplementScreen} />
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
      <Stack.Screen
        name="home"
        component={TabNavigator}
        options={{ headerTitle: "My Library" }}
      />
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
