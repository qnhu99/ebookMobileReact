import React from 'react';
import { View, Text } from 'react-native';

function OnlineBookReader(props) {
  const link = props.route.params.link;
  return (
    <View>
      <Text>Hello {link}</Text>
    </View>
  );
}

export default OnlineBookReader;
