import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import Stack from './Stack';

const screenOptions = {
  ...TransitionPresets.ModalPresentationIOS,
  gestureEnabled: true,
  cardOverlayEnabled: true,
};

// const noHeader = { headerShown: false };

function ModalNavigator() {
  const Modal = createStackNavigator();
  return (
    <Modal.Navigator
      mode="modal"
      headerMode="none"
      screenOptions={screenOptions}
    >
      <Modal.Screen name="stack" component={Stack} />
    </Modal.Navigator>
  );
}

export default ModalNavigator;
