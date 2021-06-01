import React, { useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import BookInfo from '../components/BookInfo';
import TableOfContent from '../components/TableOfContent';
import { useNavigation } from '@react-navigation/core';
import useSWR from 'swr';
import axios, { BookApi } from 'src/api';
import { Alert } from 'react-native';
import Loading from '../components/Loading';

function OnlineBookDetail(props) {
  const navigation = useNavigation();
  // const data = props.route.params.data;
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
    console.log(error);
    Alert.alert('Error', error.message);
    return <></>;
  }
  if (!data) {
    navigation.setOptions({ headerShown: false });
    return <Loading loading={true} />;
  }
  navigation.setOptions({
    title: data.book_name,
    headerShown: true,
  });
  const { chapter_name, chapter_link, season_name, season_index } = data;
  // useEffect(() => {
  //   navigation.setOptions({
  //     title: data.book_name,
  //     headerShown: true,
  //   });
  // }, []);
  const formatData = () => {
    const chapters = chapter_name.map((chap, i) => {
      return {
        index: i,
        chapter_name: chap,
        chapter_link: chapter_link[i],
      };
    });
    return {
      seasons: season_name.map((season, i) => {
        return {
          index: i,
          season_name: season,
          chapters: chapters.slice(season_index[i], season_index[i + 1]),
        };
      }),
    };
  };
  return (
    <ScrollView>
      <View style={{ marginBottom: 50 }}>
        <BookInfo data={data} />
        <TableOfContent data={formatData()} />
      </View>
    </ScrollView>
  );
}

export default OnlineBookDetail;
