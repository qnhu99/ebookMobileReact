import React from 'react';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import HomeScreen from 'src/screens/Home';
import LibraryScreen from 'src/screens/Library';
import NotificationScreen from 'src/screens/Notifications';
import SettingsScreen from 'src/screens/Settings';
import OnlineBookDetailScreen from 'src/screens/OnlineBookDetail';

import OnlineBookReader from 'src/screens/OnlineBookReader';
import EpubReader from 'src/screens/EpubReader';
import PdfReader from 'src/screens/PdfReader';
import Help from 'src/screens/Help';

// Resource
import Icons from 'src/res/icons.js';
import Colors from 'src/res/colors';

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
    tabBarIcon: ({ focused, color }) => {
      const size = 26;
      switch (route.name) {
        case 'home':
          return focused ? (
            <Icons.home color={color} size={size} />
          ) : (
            <Icons.home_outline color={color} size={size} />
          );
        case 'library':
          return focused ? (
            <Icons.library color={color} size={size} />
          ) : (
            <Icons.library_outline color={color} size={size} />
          );
        case 'notifications':
          return focused ? (
            <Icons.notifications color={color} size={size} />
          ) : (
            <Icons.notifications_outline color={color} size={size} />
          );
        case 'settings':
          return focused ? (
            <Icons.settings color={color} size={size} />
          ) : (
            <Icons.settings_outline color={color} size={size} />
          );
      }
      return (
        <Icon name="help-outline" size={size} color={color} type="ionicon" />
      );
    },
  }),
  TabNavigatorTabBarOptions: {
    activeTintColor: Colors?.green,
    inactiveTintColor: Colors?.green,
    showLabel: false,
    tabStyle: {
      // borderTopWidth: 0.75,
    },
  },
  StackScreenMainScreenOptions: {
    // headerShown: false,
  },
  StackScreenBookDetailOptions: ({ route }) => ({
    title: route.params.data.title,
  }),
};

// Main stack
function StackScreen(props) {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen {...props} />
    </Stack.Navigator>
  );
}
function HomeStackScreen() {
  return (
    <StackScreen
      name="home-screen"
      component={HomeScreen}
      options={{
        title: 'App Name',
        headerStyle: {
          // backgroundColor: '#f4511e',
        },
      }}
    />
  );
}
function LibraryStackScreen() {
  return (
    <StackScreen
      name="library-screen"
      component={LibraryScreen}
      options={{
        headerShown: false,
      }}
    />
  );
}
function NotificationStackScreen() {
  return (
    <StackScreen
      name="notifications-screen"
      component={NotificationScreen}
      options={{
        headerShown: false,
      }}
    />
  );
}
function SettingsStackScreen() {
  return (
    <StackScreen
      name="settings-screen"
      component={SettingsScreen}
      options={{
        headerShown: false,
      }}
    />
  );
}

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={options.TabNavigatorScreenOptions}
      tabBarOptions={options.TabNavigatorTabBarOptions}
    >
      <Tab.Screen name="home" component={HomeStackScreen} />
      <Tab.Screen name="library" component={LibraryStackScreen} />
      <Tab.Screen name="notifications" component={NotificationStackScreen} />
      <Tab.Screen name="settings" component={SettingsStackScreen} />
    </Tab.Navigator>
  );
}

// Whole stack
function Navigator(props) {
  const readerTitle = ({ route }) => ({
    title: route.params.title,
    headerTitleStyle: {
      fontSize: 16,
      fontFamily: 'PlayfairDisplay-Bold',
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
        name="online-book-detail"
        component={OnlineBookDetailScreen}
        options={({ route }) => ({
          title: route.params.item.title,
          headerShown: true,
        })}
      />
      <Stack.Screen name="online-book-reader" component={OnlineBookReader} />
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
        options={{ headerTitle: 'How to use?' }}
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

export default connect(mapStateToProps, null)(Navigator);
