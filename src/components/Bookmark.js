import React from 'react';
import { ScrollView, Text, FlatList, View, TouchableOpacity } from 'react-native';
import { contrastColor } from '../constants';
import Icon from './Icon';
import * as actions from '../actions';
import { connect } from 'react-redux';


function Bookmark(props) {
  const bookIndex = props.index;
  const bookmarks = props.books[bookIndex].bookmarks;

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContent}
    >
      <FlatList
        style={{ flex: 1 }}
        data={bookmarks}
        renderItem={({ item, index }) => <View
          key={index}
          style={{
            display: 'flex',
            flexDirection: 'row',
            borderColor: 'black',
            borderWidth: 1,
            marginBottom: 5,
            borderRadius: 5,
          }}>
          <TouchableOpacity style={styles.item}
            onPress={() => {
              props.goToLocation(item.location);
            }}
          >
            <Text>{item.text}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              let newBookmarks = bookmarks.filter((data, idx) => idx !== index);
              props.addMetadata({ bookmarks: newBookmarks }, bookIndex);
            }}
            style={{ width: '12%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
            <Icon type="material" name="delete-forever" size={22} color={contrastColor} />
          </TouchableOpacity>
        </View>}
      />
    </ScrollView>
  );
}

function mapStateToProps(state) {
  return {
    settings: state.settings,
    books: state.books,
    locations: state.locations
  };
}

export default connect(mapStateToProps, actions)(Bookmark);

const styles = {
  scrollView: {
    display: 'flex',
    flex: 1,
    marginRight: 10,
  },
  item: {
    padding: 5,
    fontSize: 16,
    width: '85%',
  },
  scrollViewContent: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    fontSize: 15,
    height: 36,
    width: '95%',
    color: contrastColor,
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 0,
    paddingBottom: 0,
    borderWidth: 1,
    borderColor: contrastColor,
    borderRadius: 20,
  },
};
