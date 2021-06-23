import React, { useState } from 'react';
import { View, Dimensions } from 'react-native';
import {
  Card,
  Button,
  ListItem,
  Image,
  Divider,
  Text,
} from 'react-native-elements';

const fullWidth = Dimensions.get('window').width;

function BookInfo(props) {
  const {
    handlePressReading,
    buttonTitle,
    data: { imgUrl, bookName, bookIntro, bookAuthor },
  } = props;
  const [expanded, setExpanded] = useState(false);
  const handlePress = () => setExpanded(!expanded);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Image
          source={{ uri: imgUrl }}
          resizeMode="cover"
          style={styles.image}
          containerStyle={{ alignSelf: 'center' }}
        />
        <Divider />
        <View>
          <Text h4 style={{ marginBottom: 4, textAlign: 'center' }}>
            {bookName}
          </Text>
          <Text style={{ fontSize: 16, textAlign: 'center' }}>
            {bookAuthor}
          </Text>
        </View>
        <View>
          <ListItem.Accordion
            content={<ListItem.Title>Summary</ListItem.Title>}
            isExpanded={expanded}
            onPress={handlePress}
          >
            {expanded ? (
              <ListItem.Title style={{ textAlign: 'justify', padding: 10 }}>
                {bookIntro}
              </ListItem.Title>
            ) : null}
          </ListItem.Accordion>
        </View>
        <Button
          buttonStyle={styles.button}
          title={buttonTitle}
          onPress={handlePressReading}
        />
      </View>
    </View>
  );
}

export default BookInfo;

const imageWidth = fullWidth - 80;
const imageHeight = Math.floor((imageWidth * 192) / 120) - 30;

const styles = {
  container: { backgroundColor: '#fff' },
  wrapper: { paddingLeft: 30, paddingRight: 30 },
  image: {
    height: imageHeight,
    width: imageWidth,
  },
  button: {
    borderRadius: 5,
    marginVertical: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
};
