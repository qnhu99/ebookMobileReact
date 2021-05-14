import React from 'react';
import { StatusBar } from 'react-native';
import BottomTabNavigator from 'src/navigator/BottomTabNavigator';
export default function Main() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <BottomTabNavigator />
    </>
  );
}
