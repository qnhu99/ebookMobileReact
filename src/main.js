import React from 'react';
import { StatusBar, View, Text } from 'react-native';
import BottomTabNavigator from 'src/navigator/BottomTabNavigator';
export default function Main() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <BottomTabNavigator />
    </>
  );
}
