import React from 'react';
import { Text, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../../actions/onlineBook';

const Controller = props => {
  const { prevChapter, nextChapter, chapterLinkArray } = props;

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
          navigation.navigate('online-book-reader', {
            chapter: { chapter_link: prevChapter },
          })
        }
      />
      <Button
        title="Next"
        type="clear"
        icon={<Icon name="arrow-right" size={30} color="black" />}
        iconRight
        disabled={!chapterLinkArray.some(item => item === nextChapter)}
        onPress={() =>
          navigation.navigate('online-book-reader', {
            chapter: { chapter_link: nextChapter },
          })
        }
      />
    </View>
  );
};

function ChapterContent(props) {
  const { data, currentBook } = props;
  const { chapter_link_array } = currentBook;
  const { prev_chap, next_chap, content } = data;

  const settings = props?.settings || {
    backgroundColor: 'white',
    lineHeight: 30,
    fontSize: 20,
  };

  return (
    <View
      style={[styles.wrapper, { backgroundColor: settings?.backgroundColor }]}
    >
      <ScrollView>
        <View style={[styles.container, {}]}>
          <Text
            style={[
              styles.text,
              {
                fontSize: settings?.fontSize,
                lineHeight: settings?.lineHeight,
              },
            ]}
          >
            {content}
          </Text>
        </View>
      </ScrollView>
      <Controller
        content={content}
        prevChapter={prev_chap}
        nextChapter={next_chap}
        chapterLinkArray={chapter_link_array}
      />
    </View>
  );
}

const mapStateToProps = state => {
  return {
    currentBook: state.onlineBook[0],
  };
};

export default connect(
  mapStateToProps,
  actions,
)(ChapterContent);

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
