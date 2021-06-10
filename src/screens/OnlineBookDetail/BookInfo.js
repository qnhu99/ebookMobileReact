import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Card, Button, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import dimensions from '../../res/dimensions';

function BookInfo(props) {
  const navigation = useNavigation();
  const { currentBook } = props;
  const { imgUrl, bookName, bookIntro } = props.data;
  const bookAuthor = props.data.bookAuthor.replace('\n', '');
  const [expanded, setExpanded] = useState(false);
  const [buttonTitle, setButtonTitle] = useState('Continue Reading');
  useEffect(() => {
    if (currentBook.currentChapterLink) {
      setButtonTitle('Continue Reading');
    } else {
      setButtonTitle('Start Reading');
    }
  }, [currentBook.currentChapterLink]);
  const handlePress = () => setExpanded(!expanded);

  const reading = () => {
    setButtonTitle('Continue Reading');
    if (!currentBook.currentChapterLink) {
      navigation.navigate('online-book-reader', {
        link: currentBook.chapterLinksArray[0],
      });
    } else {
      navigation.navigate('online-book-reader', {
        link: currentBook.currentChapterLink,
      });
    }
  };
  return (
    <View>
      <Card>
        <Card.Image
          source={{ uri: imgUrl }}
          resizeMode="cover"
          style={styles.image}
          containerStyle={{ alignSelf: 'center' }}
        />
        <Card.Divider />
        <View style={styles.titleContainer}>
          <Card.Title h4 style={{ marginBottom: 4 }}>
            {bookName}
          </Card.Title>
          <Text style={{ fontSize: 14 }}>by {bookAuthor}</Text>
        </View>
        <View>
          <ListItem.Accordion
            content={<ListItem.Title>Summary</ListItem.Title>}
            isExpanded={expanded}
            onPress={handlePress}
          >
            <ListItem.Title style={{ textAlign: 'justify', padding: 10 }}>
              {bookIntro}
            </ListItem.Title>
          </ListItem.Accordion>
        </View>
        <Button
          buttonStyle={styles.button}
          title={buttonTitle}
          onPress={reading}
        />
      </Card>
    </View>
  );
}

const mapStateToProps = state => {
  return {
    currentBook: state.recentBooks[0],
  };
};

export default connect(mapStateToProps)(BookInfo);

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
