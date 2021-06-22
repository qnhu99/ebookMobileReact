import React, { useEffect, useState } from 'react';
import { View, Alert, SectionList } from 'react-native';
import { connect } from 'react-redux';
import { ListItem, Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import BookInfo from 'src/components/OnlineBookInfo';
import LoadingForChapter from 'src/components/LoadingForChapter';

const Item = ({ onPress, chapter }) => (
  <ListItem onPress={onPress} bottomDivider>
    <ListItem.Content>
      <ListItem.Title numberOfLines={1} style={styles.chapterName}>
        {chapter.chapter_name}
      </ListItem.Title>
    </ListItem.Content>
  </ListItem>
);

function OnlineBookDetail(props) {
  const navigation = useNavigation();
  const { currentChapterIndex, currentChapterLink } = props;
  const {
    data,
    data: { bookInfo, tableOfContent },
  } = props.route.params;
  const [chapterURL, setChapterURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const sectionListData = tableOfContent.seasons.map(s => ({
    title: s.season_name,
    data: s.chapters,
  }));

  useEffect(() => {
    if (error) {
      const message = error.message;
      Alert.alert('Error', message);
      setError(null);
    }
  }, [error]);

  const handlePressReading = () => {
    setLoading(true);
    setChapterURL(currentChapterLink);
  };

  const handlePressChapter = url => {
    setLoading(true);
    setChapterURL(url);
  };

  navigation.setOptions({ title: data.bookInfo.bookName, headerShown: true });
  return (
    <View style={styles.container}>
      <SectionList
        sections={sectionListData}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <Item
            chapter={item}
            onPress={() => handlePressChapter(item.chapter_link)}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.seasonTitle}>{title}</Text>
        )}
        ListHeaderComponent={
          <BookInfo
            data={bookInfo}
            handlePressReading={handlePressReading}
            buttonTitle={
              currentChapterIndex < 0 ? 'Start reading' : 'Continue reading'
            }
          />
        }
      />
      <LoadingForChapter
        show={loading}
        url={chapterURL}
        handleSuccess={newData => {
          setLoading(false);
          navigation.navigate('online-book-reader', {
            data: { ...newData, chapterURL },
          });
        }}
        handleError={newError => {
          setLoading(false);
          setError(newError);
        }}
        handleCancel={() => {
          setLoading(false);
        }}
      />
    </View>
  );
}

const mapStateToProps = state => {
  return {
    currentChapterIndex: state.recentBooks[0]?.currentChapterIndex,
    currentChapterLink:
      state.recentBooks[0]?.currentChapterLink ||
      state.recentBooks[0]?.chapterLinksArray[0],
  };
};

export default connect(mapStateToProps)(OnlineBookDetail);

const styles = {
  seasonTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 15,
    paddingLeft: 15,
  },
  item: { paddingLeft: 10, paddingRight: 10 },
  chapterName: { paddingLeft: 10, paddingRight: 10, fontSize: 16 },
};
