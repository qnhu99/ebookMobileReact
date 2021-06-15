import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Overlay, Button } from 'react-native-elements';

export default function Loading(props) {
  return (
    <Overlay overlayStyle={{ backgroundColor: 'rgba(192,192,192,0.3)' }}>
      <ActivityIndicator size="large" />
      {props?.handleCancel ? (
        <Button title="Cancel" type="outline" onPress={props.handleCancel} />
      ) : null}
    </Overlay>
  );
}
