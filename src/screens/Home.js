import React, { useState, useLayoutEffect, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Divider } from 'react-native-elements';
import { connect } from 'react-redux';
// Custom components
import AddButton from '../components/AddButton';
import BookItem from '../components/BookItem';
import SearchBar from '../components/SearchBar';
import WelcomeIntro from '../components/WelcomeIntro';
import RecentBookList from 'src/components/RecentBookList';
import Colors from 'src/constants/colors';
import ViewmoreBtn from 'src/components/ViewmoreBtn';

// Main
function HomeScreen(props) {

  const navigation = useNavigation();
  const [isSearchBar, setSearchBar] = useState(false);
  const [input, setInput] = useState('');
  const fontFamily = 'CircularLight';

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
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10,
            height: 100,
          }}
        >
          <Text style={{ ...styles.message, fontFamily }}>
            {'Your library is empty!'}
          </Text>
          <Text style={{ ...styles.message, fontFamily }}>
            {'Add some books to get started'}
          </Text>
        </View>
      );
    }
    return (
      <View>
        {listFilter()
          .slice(0, 10)
          .map((item, index) => (
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
    <>
      <AddButton />
      <ScrollView style={styles.wrapper}>
        {/* <WelcomeIntro /> */}
        <RecentBookList />
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{'Recent files'}</Text>
          {renderBooks()}
          <Divider />
          {props.books.length > 0 && <ViewmoreBtn onPress={() => navigation.navigate('file-library')} />}
        </View>
      </ScrollView>
    </>
  );
}

function mapStateToProps(state) {
  return {
    books: state.books,
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
  section: { marginTop: 7, backgroundColor: Colors.light },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 15,
  },
};
