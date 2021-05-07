import React from 'react';
import { useNavigation } from '@react-navigation/core';
import {
  ActivityIndicator,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Image, Divider } from 'react-native-elements';
import styles from './styles.js';
import { STRINGS } from 'src/res';
import BooksData from 'src/test/books';

const BookItem = ({ data }) => {
  const navigation = useNavigation();
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('BookDetail', { data });
        }}>
        <View style={styles.bookItem}>
          <Image
            style={styles.coverImage}
            source={data.cover}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>
      </TouchableOpacity>
    </>
  );
};

export default function RecentBooksList(props) {
  const renderBookItem = ({ item }) => <BookItem data={item} />;
  const navigation = useNavigation();
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{STRINGS.RECENT_VIEW_BOOKS}</Text>
      <FlatList
        horizontal
        data={BooksData}
        renderItem={renderBookItem}
        keyExtractor={(_, index) => index.toString()}
      />
      <Divider style={{ marginTop: 5, cover: 'black' }} />
      <TouchableOpacity
        style={{ paddingVertical: 5 }}
        onPress={() => {
          navigation.navigate('Library');
        }}>
        <Text style={{ textAlign: 'center' }}>{STRINGS.VIEW_MORE}</Text>
      </TouchableOpacity>
    </View>
  );
}
