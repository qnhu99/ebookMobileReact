import React, { useState, useLayoutEffect, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import {
  View,
  ScrollView,
  Text,
  FlatList,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Button, Image, Divider } from 'react-native-elements';
import { connect } from 'react-redux';

import AddButton from 'src/components/AddButton';
import BookItem from 'src/components/BookItem';
import SearchBar from 'src/components/SearchBar';
import Icon from 'src/components/Icon';

import Icons from 'src/res/icons';
import Colors from 'src/res/icons';

import { contrastColor } from 'src/constants';

// dummy data
import BooksData from './dummy_data/books.js';

// Welcome Intro
function Intro() {
  return (
    <View style={styles.intro}>
      <Text style={{ fontSize: 24, paddingVertical: 5 }}>
        {'Welcome to App name'}
      </Text>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ textAlign: 'center' }}>
          {'Save your favorite stories\nand find more from the internet'}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <Button
          icon={Icons.sign_up}
          title="Sign up"
          buttonStyle={{ marginHorizontal: 5, marginTop: 10, width: 130 }}
        />
        <Button
          icon={Icons.sign_in}
          title="Sign in"
          buttonStyle={{ marginHorizontal: 5, marginTop: 10, width: 130 }}
        />
      </View>
    </View>
  );
}

// Horizontal List for books
function HorizontalList() {
  const navigation = useNavigation();
  const renderBook = ({ item }) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('online-book-detail', { item });
          }}
        >
          <View style={styles.bookItem}>
            <Image
              style={styles.coverImage}
              source={{ uri: item.cover }}
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>
        </TouchableOpacity>
      </>
    );
  };
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{'Recent book'}</Text>
      <FlatList
        horizontal
        data={BooksData}
        renderItem={renderBook}
        keyExtractor={(_, index) => index.toString()}
      />
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

// Main
function HomeScreen(props) {
  const navigation = useNavigation();
  const [isSearchBar, setSearchBar] = useState(false);
  const [input, setInput] = useState('');

  useEffect(() => {
    StatusBar.setBackgroundColor('#ffffff', true);
    StatusBar.setBarStyle('dark-content');
    const unsubscribe = props.navigation.addListener('blur', hideSearchBar);
    return unsubscribe;
  }, []);

  useLayoutEffect(() => {
    if (isSearchBar) {
      props.navigation.setOptions({
        header: () => (
          <SearchBar
            isVisible={isSearchBar}
            value={input}
            setValue={setInput}
            hide={hideSearchBar}
          />
        ),
      });
    } else {
      navigation.setOptions({
        header: undefined,
        headerRight: () => (
          <View style={styles.headerIconsWrapper}>
            <Icon
              name="help-circle"
              size={20}
              color={contrastColor}
              style={styles.helpIcon}
              onPress={() => props.navigation.navigate('help')}
            />
            <Icon
              name="search"
              size={20}
              color={contrastColor}
              style={styles.searchIcon}
              onPress={() => setSearchBar(true)}
            />
          </View>
        ),
      });
    }
  }, [navigation, isSearchBar, input, setInput, setSearchBar]);

  function hideSearchBar() {
    setSearchBar(false);
    setInput('');
  }

  function listFilter() {
    if (input) {
      return props.books.filter((book) => {
        let itemData = ` ${book.title} ${book.author}`.toUpperCase();
        let searchData = ' ' + input.toUpperCase();
        return itemData.indexOf(searchData) > -1;
      });
    }
    return props.books;
  }

  function renderBooks() {
    if (props.books.length === 0) {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: '#ffffff',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={styles.message}>{'Your library is empty!'}</Text>
          <Text style={styles.message}>{'Add some books to get started'}</Text>
          <Text style={[styles.message, { fontSize: 13, fontStyle: 'italic' }]}>
            {'(Only EPUB files supported)'}
          </Text>
        </View>
      );
    }
    return (
      <View>
        {listFilter().map((item, index) => (
          <BookItem
            {...item}
            navigation={props.navigation}
            index={index}
            key={index}
          />
        ))}
      </View>
    );
  }

  return (
    <ScrollView style={styles.wrapper}>
      <Intro />
      <HorizontalList />
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{'Recent files'}</Text>
        {renderBooks()}
      </View>
      <AddButton />
    </ScrollView>
  );
}

function mapStateToProps(state) {
  return {
    books: state.books,
  };
}

export default connect(mapStateToProps, null)(HomeScreen);

const styles = {
  wrapper: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  flatlist: {
    paddingTop: 15,
    paddingBottom: 10,
  },
  message: {
    fontSize: 16,
    fontFamily: 'CircularLight',
    marginBottom: 5,
  },
  searchIcon: { paddingRight: 20 },
  helpIcon: { paddingRight: 25 },
  headerIconsWrapper: { flexDirection: 'row' },
  container: {
    flex: 1,
    backgroundColor: Colors.light,
  },
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
  fileItem: {
    flex: 1,
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderTopColor: Colors.dark,
  },
  intro: {
    backgroundColor: Colors.light,
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20,
    elevation: 5,
    // marginTop: 180,
  },
};
