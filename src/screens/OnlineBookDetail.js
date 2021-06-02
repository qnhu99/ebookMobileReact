import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import BookInfo from '../components/BookInfo';
import TableOfContent from '../components/TableOfContent';
import { useNavigation } from '@react-navigation/core';
import useSWR from 'swr';
import axios, { BookApi } from 'src/api';
import Loading from '../components/Loading';
import { connect } from 'react-redux';
import * as actions from '../actions/onlineBook';

function OnlineBookDetail(props) {
  const navigation = useNavigation();
  const link = props.route.params.link;
  const { data, error } = useSWR(
    link,
    url => axios(BookApi.getBookDetail(url)).then(res => res.data),
    {
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // Never retry on 404.
        if (error.status === 404) return;
        // Only retry up to 10 times.
        if (retryCount >= 10) return;
        // Retry after 5 seconds.
        setTimeout(() => revalidate({ retryCount }), 5000);
      },
    },
  );
  if (error) {
    navigation.setOptions({ title: 'Error', headerShown: true });
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          Something went wrong...
        </Text>
        <Text style={{ fontSize: 16 }}>{error.message}</Text>
      </View>
    );
  } else if (!data) {
    navigation.setOptions({ headerShown: false });
    return <Loading loading={true} />;
  } else {
    navigation.setOptions({
      title: data.book_name,
      headerShown: true,
    });
    const { chapter_name, chapter_link, season_name, season_index } = data;
    const totalChapters = chapter_name.length;
    const formatData = () => {
      const chapters = chapter_name.map((chap, i) => {
        return {
          chapter_index: i,
          chapter_name: chap,
          chapter_link: chapter_link[i],
          previous_link: i - 1 >= 0 ? chapter_link[i - 1] : '',
          next_link: i + 1 < totalChapters ? chapter_link[i + 1] : '',
        };
      });
      return {
        total_chapters: totalChapters,
        chapter_link,
        seasons: season_name.map((season, i) => {
          return {
            season_index: i,
            season_name: season,
            chapters: chapters
              .slice(season_index[i], season_index[i + 1])
              .map(chap => ({ ...chap, season_index, season_name })),
          };
        }),
      };
    };
    // Add to Redux
    props.addRecentBook({
      book_url: link,
      total_chapters: totalChapters,
      table_of_content: formatData(),
      chapter_link_array: chapter_link,
    });

    return (
      <ScrollView>
        <View>
          <BookInfo data={data} />
          <TableOfContent data={formatData()} />
        </View>
      </ScrollView>
    );
  }
}

export default connect(
  null,
  actions,
)(OnlineBookDetail);
