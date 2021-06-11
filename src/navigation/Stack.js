import React from 'react';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from 'src/screens/Home';
import OnlineBookLibrary from 'src/screens/OnlineBookLibrary';
import FileLibrary from 'src/screens/FileLibrary';
import SettingsScreen from 'src/screens/Settings';
import OnlineBookDetail from 'src/screens/OnlineBookDetail';
import OnlineBookReader from 'src/screens/OnlineBookReader';
import EpubReader from 'src/screens/EpubReader';
import PdfReader from 'src/screens/PdfReader';
import Help from 'src/screens/Help';
import Icons from 'src/res/icons.js';
import Colors from 'src/res/colors';
import { globalSettings } from '../constants';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const screenOptions = {
  headerTitleStyle: {
    fontSize: 18,
    fontFamily: globalSettings.fontFamily,
  },
  headerShown: true,
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
        case 'online-book-library':
          return focused ? (
            <Icons.earth color={color} size={size} />
          ) : (
            <Icons.earth_outline color={color} size={size} />
          );
        case 'file-library':
          return focused ? (
            <Icons.file color={color} size={size - 5} />
          ) : (
            <Icons.file_outline color={color} size={size - 5} />
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
        title: 'Ebook Reader',
        headerStyle: {
          fontFamily: globalSettings.fontFamily,
        },
      }}
    />
  );
}

function OnlineBookLibraryStackScreen() {
  return (
    <StackScreen
      name="online-book-library-screen"
      component={OnlineBookLibrary}
      options={{
        title: 'Online Book',
        headerStyle: {
          fontFamily: globalSettings.fontFamily,
        },
      }}
    />
  );
}

function FileLibraryStackScreen() {
  return (
    <StackScreen
      name="file-library-screen"
      component={FileLibrary}
      options={{
        title: 'Files',
        headerStyle: {
          fontFamily: globalSettings.fontFamily,
        },
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
      <Tab.Screen
        name="online-book-library"
        component={OnlineBookLibraryStackScreen}
      />
      <Tab.Screen name="file-library" component={FileLibraryStackScreen} />
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
      fontFamily: globalSettings.fontFamily,
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
        name="main-screen"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="online-book-detail" component={OnlineBookDetail} />
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
    globalSettings: state.globalSettings,
  };
}

export default connect(
  mapStateToProps,
  null,
)(Navigator);
