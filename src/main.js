import React from 'react';
import {StatusBar, Text, View} from 'react-native';

import {BottomTabNavigator} from 'src/navigator';

export default function Main() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <BottomTabNavigator />
    </>
  );
}
