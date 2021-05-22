import React from 'react';

import { View, Text } from 'react-native';
import { Card, Button } from 'react-native-elements';

import dimensions from '../res/dimensions';

function BookInfo({ data: { img_url, book_name, book_intro, book_author } }) {
  const imageWidth = dimensions.full_width - 80;
  const imageHeight = Math.floor((imageWidth * 192) / 120);

  return (
    <Card>
      <Card.Image
        source={{ uri: img_url }}
        resizeMode="cover"
        style={{
          height: imageHeight,
          width: imageWidth,
        }}
        containerStyle={{
          alignSelf: 'center',
        }}
      />
      <Card.Divider />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          marginVertical: 10,
        }}
      >
        <Card.Title h4 style={{ marginBottom: 4 }}>
          {book_name}
        </Card.Title>
        <Text style={{ fontSize: 16 }}>by {book_author}</Text>
      </View>

      <Text style={{ marginVertical: 10 }}>{book_intro}</Text>
      <Button
        buttonStyle={{
          borderRadius: 2,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
        }}
        title="Start reading"
      />
    </Card>
  );
}

export default BookInfo;
