import React, { useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import BookInfo from '../components/BookInfo';
import TableOfContent from '../components/TableOfContent';

function OnlineBookDetail({ route, navigation }) {
  const data = route.params.data;
  const { chapter_name, chapter_link, season_name, season_index } = data;
  useEffect(() => {
    navigation.setOptions({
      title: data.book_name,
      headerShown: true,
    });
  }, []);
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
