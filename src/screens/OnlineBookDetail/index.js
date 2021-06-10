import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import useSWR from 'swr';
import { useNavigation } from '@react-navigation/native';
import Loading from '../../components/Loading';
import { updateRecentOnlineBooks } from 'src/actions/recentBooks';
import axios, { BookApi } from 'src/api';
import BookInfo from './BookInfo';
import TableOfContent from './TableOfContent';

const Error = props => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
      Something went wrong...
    </Text>
    <Text style={{ fontSize: 16 }}>{props.message}</Text>
  </View>
);

const formatBookInfo = data => {
  const {
    img_url: imgUrl,
    book_name: bookName,
    book_intro: bookIntro,
    book_author: bookAuthor,
  } = data;
  return { imgUrl, bookName, bookIntro, bookAuthor };
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

const fetcher = url => axios(BookApi.getBookDetail(url)).then(res => res.data);

function OnlineBookDetail(props) {
  const navigation = useNavigation();
  const link = props.route.params.link;

  const { data, error } = useSWR(link, fetcher, {
    refreshInterval: 21600,
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      if (error.status === 404) return;
      if (retryCount >= 10) return;
      setTimeout(() => revalidate({ retryCount }), 500);
    },
  });

  if (error) {
    navigation.setOptions({ title: 'Error', headerShown: true });
    return <Error message={error.message} />;
  }

  if (data) {
    const tableOfContent = formatTableOfContent(data);
    const currentBook = {
      bookUrl: link,
      bookName: data.book_name,
      bookAuthor: data.book_author.replace('\n', ''),
      imgUrl: data.img_url,
      tableOfContent,
      chapterLinksArray: data.chapter_link,
    };
    props.updateRecentOnlineBooks(currentBook);
    navigation.setOptions({ title: data.book_name, headerShown: true });
    const redirectToReader = chapter => {
      navigation.navigate('online-book-reader', { link: chapter.chapter_link });
    };

    return (
      <ScrollView>
        <View>
          <BookInfo data={formatBookInfo(data)} />
          <TableOfContent
            data={tableOfContent}
            redirectToReader={redirectToReader}
          />
        </View>
      </ScrollView>
    );
  } else {
    navigation.setOptions({ headerShown: false });
    return <Loading />;
  }
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
