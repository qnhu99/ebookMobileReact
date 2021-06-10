import React from 'react';
import { Text, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';

const Controller = props => {
  const { prevChapter, nextChapter, chapterLinksArray } = props;
  const navigation = useNavigation();
  return (
    <View style={styles.controller}>
      <Button
        title="Prev"
        type="clear"
        icon={<Icon name="arrow-left" size={30} color="black" />}
        iconLeft
        disabled={prevChapter === ''}
        onPress={() =>
          navigation.navigate('online-book-reader', { link: prevChapter })
        }
      />
      <Button
        title="Next"
        type="clear"
        icon={<Icon name="arrow-right" size={30} color="black" />}
        iconRight
        disabled={!chapterLinksArray.some(item => item === nextChapter)}
        onPress={() =>
          navigation.navigate('online-book-reader', { link: nextChapter })
        }
      />
    </View>
  );
};

function ChapterContent(props) {
  const { prev_chap, next_chap, content } = props.data;
  const { chapterLinksArray } = props;
  const backgroundColor = props.settings.theme.value;
  const textColor = props.settings.theme.textColor;
  const fontSize = props.settings.fontSize;
  const lineHeight = props.settings.lineHeight;

  return (
    <View style={[styles.wrapper, { backgroundColor }]}>
      <ScrollView>
        <View style={styles.container}>
          <Text
            style={[
              styles.text,
              {
                color: textColor,
                fontSize,
                lineHeight: fontSize * lineHeight,
              },
            ]}
          >
            {content}
          </Text>
        </View>
      </ScrollView>
      <Controller
        prevChapter={prev_chap}
        nextChapter={next_chap}
        chapterLinksArray={chapterLinksArray}
      />
    </View>
  );
}

const mapStateToProps = state => {
  return {
    chapterLinksArray: state.recentBooks[0].chapterLinksArray,
    settings: state.readerSettings,
  };
};

export default connect(mapStateToProps)(ChapterContent);

const styles = {
  wrapper: { flex: 1 },
  container: { padding: 30 },
  text: { textAlign: 'justify', fontSize: 20, lineHeight: 30 },
  controller: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 50,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 0.75,
    borderTopColor: 'grey',
    elevation: 5,
    backgroundColor: 'white',
  },
};
