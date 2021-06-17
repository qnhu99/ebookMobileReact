import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import BookItem from '../components/BookItem';
import AddButton from '../components/AddButton';


function FileLibrary(props) {
  function listFilter() {
    if (props.books.length > 0) {
      return props.books.filter((book) => {
        let itemData = ` ${book.title} ${book.author}`.toUpperCase();
        let searchData = ' ' + book.title.toUpperCase();
        return itemData.indexOf(searchData) > -1;
      });
    }
    return props.books;
  }

  function renderBooks() {
    if (props.books.length === 0) {
      return (
        <View style={styles.wrapper}>
          <Text style={styles.message}>Your library is empty!</Text>
          <Text style={styles.message}>Add some books to get started</Text>
        </View>
      );
    }
    return (
      <FlatList
        data={listFilter()}
        renderItem={({ item, index }) => (
          <BookItem {...item} navigation={props.navigation} index={index} />
        )}
        keyExtractor={(item, i) => i.toString()}
      />
    );
  }

  return (
    <>
      <AddButton />
      {renderBooks()}
    </>
  );
}

function mapStateToProps(state) {
  return {
    books: state.books
  };
}

export default connect(
  mapStateToProps,
  null
)(FileLibrary);

const styles = {
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  flatlist: {
    paddingTop: 15,
    paddingBottom: 10
  },
  message: {
    fontSize: 16,
    fontFamily: 'CircularLight',
    marginBottom: 5
  },
  searchIcon: { paddingRight: 20 },
  helpIcon: { paddingRight: 25 },
  headerIconsWrapper: { flexDirection: 'row' }
};