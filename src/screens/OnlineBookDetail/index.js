import React, { useEffect, useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import BookInfo from './BookInfo';
import TableOfContent from './TableOfContent';
import LoadingForChapter from 'src/components/LoadingForChapter';

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

  const handlePressChapter = (url, index) => {
    setLoading(true);
    setChapterURL(url);
  };

  //navigation.setOptions({ title: data.book_name, headerShown: true });
  navigation.setOptions({ title: data.bookInfo.bookName, headerShown: true });
  return (
    <>
      <ScrollView>
        <View>
          <BookInfo
            data={bookInfo}
            handlePressReading={handlePressReading}
            buttonTitle={
              currentChapterIndex < 0 ? 'Start reading' : 'Continue reading'
            }
          />
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

const mapStateToProps = state => {
  return {
    currentChapterIndex: state.recentBooks[0]?.currentChapterIndex,
    currentChapterLink: state.recentBooks[0]?.currentChapterLink,
  };
};

export default connect(mapStateToProps)(OnlineBookDetail);
