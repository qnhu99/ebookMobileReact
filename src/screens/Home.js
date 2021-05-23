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

import Colors from 'src/res/icons';

import { contrastColor, globalSettings } from 'src/constants';

// dummy data
import BooksData from './dummy_data/books.js';

// Welcome Intro
function Intro(props) {
  const fontFamily = props.fontFamily;
  console.log(">> ~ file: Home.js ~ line 31 ~ Intro ~ fontFamily", fontFamily)

  return (
    <View style={{ ...styles.intro, fontFamily }}>
      <Text style={{ fontSize: 22, paddingVertical: 5, fontWeight: 'bold' }}>
        {'Welcome to Ebook Reader'}
      </Text>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontFamily, textAlign: 'center' }}>
          {'Save your favorite stories\nand find more from the internet'}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        {/* <Button
          icon={Icons.sign_up}
          title="Sign up"
          buttonStyle={{ marginHorizontal: 5, marginTop: 10, width: 130 }}
        />
        <Button
          icon={Icons.sign_in}
          title="Sign in"
          buttonStyle={{ marginHorizontal: 5, marginTop: 10, width: 130 }}
        /> */}
      </View>
    </View>
  );
}

// Horizontal List for books
function HorizontalList(props) {
  const navigation = useNavigation();
  const fontFamily = props.fontFamily;
  console.log(">> ~ file: Home.js ~ line 66 ~ HorizontalList ~ fontFamily", fontFamily)
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
      <Text style={{ ...styles.sectionTitle, fontFamily: "TimesNewRoman" }}>{'Recent book'}</Text>
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
        <Text style={{ textAlign: 'center', fontFamily }}>{'View more'}</Text>
      </TouchableOpacity>
    </View>
  );
}

// Main
function HomeScreen(props) {
  const globalSettings = props.globalSettings;
  const fontFamily = globalSettings.fontFamily;

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
              name="search"
              size={20}
              color={contrastColor}
              style={styles.searchIcon}
              onPress={() => setSearchBar(true)}
            />
            <Icon
              name="help-circle"
              size={20}
              color={contrastColor}
              style={styles.helpIcon}
              onPress={() => props.navigation.navigate('help')}
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
      return props.books.filter(book => {
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
            alignItems: 'center'
          }}
        >
          <Text style={{ ...styles.message, fontFamily }}>{'Your library is empty!'}</Text>
          <Text style={{ ...styles.message, fontFamily }}>{'Add some books to get started'}</Text>
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
    <React.Fragment>
      <ScrollView style={styles.wrapper}>
        <Intro fontFamily={globalSettings.fontFamily} />
        <HorizontalList fontFamily={globalSettings.fontFamily} />
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{'Recent files'}</Text>
          {renderBooks()}
        </View>
      </ScrollView>
      <AddButton />
    </React.Fragment>
  );
}

function mapStateToProps(state) {
  return {
    books: state.books,
    globalSettings: state.globalSettings,
  };
}

export default connect(
  mapStateToProps,
  null,
)(HomeScreen);

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
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 15,
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
