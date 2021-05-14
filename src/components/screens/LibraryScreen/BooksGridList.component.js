import React from 'react';
import {
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';

import styles from './styles';
import BooksData from 'src/dummy_data/books';
const numColumns = 2;

const BookItem = ({ data }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        navigation.navigate('BookDetail', { data });
      }}>
      <Image
        style={styles.cover}
        // style={{ height: 192, width: 120 }}
        source={{ uri: data.cover }}
        PlaceholderContent={<ActivityIndicator />}
      />
      <Text numberOfLines={1} style={styles.title}>
        {data.title}
      </Text>
    </TouchableOpacity>
  );
};

export default function BooksGridList() {
  const formatData = (data, numColumns) => {
    const totalRows = Math.floor(data.length / numColumns);
    let totalLastRow = data.length - totalRows * numColumns;
    while (totalLastRow !== 0 && totalLastRow !== numColumns) {
      data.push({ key: 'blank', empty: true });
      totalLastRow++;
    }
    return data;
  };
  const renderItem = ({ item }) => <BookItem data={item} />;
  return (
    <FlatList
      data={formatData(BooksData, numColumns)}
      renderItem={renderItem}
      keyExtractor={(_, index) => index.toString()}
      horizontal={false}
      numColumns={numColumns}
    />
  );
}
