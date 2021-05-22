import React, { useEffect } from 'react';

import { Text, View } from 'react-native';

function OnlineBookDetail({ route, navigation }) {
  const { book_name } = route.params.data;
  useEffect(() => {
    navigation.setOptions({
      title: book_name,
      headerShown: true,
    });
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Online Book detail Screen {book_name}</Text>
    </View>
  );
}

export default OnlineBookDetail;
