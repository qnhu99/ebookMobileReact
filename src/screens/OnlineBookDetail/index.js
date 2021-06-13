import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, Alert } from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { updateRecentOnlineBooks } from 'src/actions/recentBooks';
import BookInfo from './BookInfo';
import TableOfContent from './TableOfContent';
import LoadingForChapter from 'src/components/LoadingForChapter';

const formatBookInfo = data => {
  const {
    img_url: imgUrl,
    book_name: bookName,
    book_intro: bookIntro,
    book_author: bookAuthor,
  } = data;
  return {
    imgUrl,
    bookName,
    bookIntro,
    bookAuthor: bookAuthor.replace('\n', ''),
  };
};
const formatTableOfContent = data => {
  const { chapter_name, chapter_link, season_name, season_index } = data;
  const chaptersFormatted = chapter_name.map((chap, i) => {
    return {
      chapter_index: i,
      chapter_name: chap,
      chapter_link: chapter_link[i],
    };
  });
  return {
    seasons: season_name.map((season, i) => {
      return {
        season_index: i,
        season_name: season,
        chapters: chaptersFormatted
          .slice(season_index[i], season_index[i + 1])
          .map(chap => ({ ...chap, season_index, season_name })),
      };
    }),
  };
};

function OnlineBookDetail(props) {
  const navigation = useNavigation();
  const [chapterURL, setChapterURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (error) {
      const message = error.message;
      Alert.alert('Error', message);
      setError(null);
    }
  }, [error]);
  const data = props.route.params.data;
  const bookInfo = formatBookInfo(data);
  const tableOfContent = formatTableOfContent(data);
  useEffect(() => {
    const currentBook = {
      bookUrl: data.book_url,
      bookName: bookInfo.bookName,
      bookAuthor: bookInfo.bookAuthor,
      imgUrl: bookInfo.imgUrl,
      tableOfContent,
      chapterLinksArray: data.chapter_link,
    };
    props.updateRecentOnlineBooks(currentBook);
  }, [data.book_url]);

  const handlePressChapter = url => {
    setLoading(true);
    setChapterURL(url);
  };

  navigation.setOptions({ title: data.book_name, headerShown: true });

  return (
    <>
      <ScrollView>
        <View>
          <BookInfo data={bookInfo} handlePressChapter={handlePressChapter} />
          <TableOfContent
            data={tableOfContent}
            handlePressChapter={handlePressChapter}
          />
        </View>
      </ScrollView>
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
    </>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    updateRecentOnlineBooks: data => dispatch(updateRecentOnlineBooks(data)),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(OnlineBookDetail);
