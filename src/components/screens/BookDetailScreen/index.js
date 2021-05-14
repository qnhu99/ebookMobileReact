import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';

import styles from './styles';
import Detail from './Detail.component';
import ChaptersList from './ChaptersList.component';

/** Delete later */
import dummy_data from './temp';

export default function BookDetailScreen(props) {
  // Run GET request to book url to get book detail BEFORE USING THIS COMPONENT
  // this detail is available before calling so DELETE dummy DATA LATER
  // all detail will be in props.item but USE HARD DATA FOR NOW
  // book_detail_scheme = {
  //   title,
  //   author,
  //   cover:{uri:"..."},
  //   description,
  //   table_of_content: [
  //     season: [{season_name, chapters:[chapter_name, chapter_link]}]
  //   ]
  // }
  // const item = props.item;
  const item = dummy_data;
  const chapters = item.chapter_name.map((name, index) => {
    return {
      chapter_name: name,
      chapter_link: item.chapter_link[index],
    };
  });
  const data_details = {
    title: item.book_name,
    author: item.book_author,
    cover_img_url: item.img_url,
    description: item.book_intro,
  };
  const data_table_of_content = item.season_name.map((name, i) => {
    return {
      season_name: name,
      chapters: chapters.slice(item.season_index[i], item.season_index[i + 1]),
    };
  });

  return (
    <View style={styles.container}>
      <Detail data={data_details} />
      <ChaptersList data={data_table_of_content} />
    </View>
  );
}
