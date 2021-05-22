import React from 'react';
import { View, Text } from 'react-native';

function OnlineBookReader(props) {
  const data = props.route.params.data;
  console.log(data);
  return (
    <View>
      <Text>Online book reader</Text>
    </View>
  );
}

export default OnlineBookReader;
