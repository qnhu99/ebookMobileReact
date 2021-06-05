import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-elements';
import Images from './Images';
// import Icons from 'src/res/icons';
import Colors from 'src/res/icons';

// dummy data
// import BooksData from '../dummy_data/books';

const BookItem = ({ data }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('online-book-detail', { data });
      }}
    >
      <View style={styles.bookItem}>
        <Images style={styles.coverImage} source={{ uri: data.img_url }} />
      </View>
    </TouchableOpacity>
  );
};

// Horizontal List for books
function HorizontalList({ navigation }) {
  const renderBook = ({ item }) => {
    return <BookItem data={item} />;
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{'Recent book'}</Text>
      {/* <FlatList
        horizontal
        data={BooksData}
        renderItem={renderBook}
        keyExtractor={(_, index) => index.toString()}
      /> */}
      <Divider style={{ marginTop: 5, cover: 'black' }} />
      <TouchableOpacity
        style={{ paddingVertical: 5 }}
        onPress={() => {
          navigation.navigate('library');
        }}
      >
        <Text style={{ textAlign: 'center' }}>{'View more'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  section: {
    marginTop: 7,
    backgroundColor: Colors.light,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 5,
  },
  bookItem: {
    marginRight: 3,
    marginBottom: 10,
    backgroundColor: Colors.dark,
  },
  coverImage: {
    height: 192,
    width: 120,
    resizeMode: 'contain',
  },
};

export default HorizontalList;
