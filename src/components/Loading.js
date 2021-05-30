import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Overlay } from 'react-native-elements';

export default function Loading(props) {
  return (
    <Overlay
      isVisible={props.loading}
      overlayStyle={{ backgroundColor: 'rgba(192,192,192,0.3)' }}
    >
      <ActivityIndicator size="large" />
    </Overlay>
  );
}
