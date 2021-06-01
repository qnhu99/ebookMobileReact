import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Card, Button, ListItem } from 'react-native-elements';
const { Accordion, Title } = ListItem;

import dimensions from '../res/dimensions';

function BookInfo(props) {
  const { img_url, book_name, book_intro } = props.data;
  const book_author = props.data.book_author.replace('\n', '');
  const [expanded, setExpanded] = useState(false);
  const handlePress = () => setExpanded(!expanded);
  return (
    <View>
      <Card>
        <Card.Image
          source={{ uri: img_url }}
          resizeMode="cover"
          style={styles.image}
          containerStyle={{ alignSelf: 'center' }}
        />
        <Card.Divider />
        <View style={styles.titleContainer}>
          <Card.Title h4 style={{ marginBottom: 4 }}>
            {book_name}
          </Card.Title>
          <Text style={{ fontSize: 14 }}>by {book_author}</Text>
        </View>
        <View>
          <Accordion
            content={<Title>Summary</Title>}
            isExpanded={expanded}
            onPress={handlePress}
          >
            <Title style={{ textAlign: 'justify', padding: 10 }}>
              {book_intro}
            </Title>
          </Accordion>
        </View>
        <Button buttonStyle={styles.button} title="Start reading" />
      </Card>
    </View>
  );
}

const imageWidth = dimensions.full_width - 80;
const imageHeight = Math.floor((imageWidth * 192) / 120) - 30;

const styles = {
  image: {
    height: imageHeight,
    width: imageWidth,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  button: { borderRadius: 5, marginVertical: 10 },
};

export default BookInfo;
