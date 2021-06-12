import React from 'react';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Text, View, FlatList, Dimensions } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import Colors from 'src/res/colors';

const Item = ({ data }) => {
  const navigation = useNavigation();
  return (
    <ListItem
      bottomDivider
      onPress={() =>
        navigation.navigate('online-book-detail', { link: data.bookUrl })
      }
    >
      <Avatar source={{ uri: data.imgUrl }} size="large" />
      <ListItem.Content>
        <ListItem.Title numberOfLines={2}>{data.bookName}</ListItem.Title>
        <ListItem.Subtitle>{data.bookAuthor}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

function OnlineBookLibraryScreen(props) {
  const { books } = props;
  const renderItem = ({ item }) => <Item data={item} />;

  const render = () => {
    if (books.length === 0) {
      return (
        <View style={styles.wrapper}>
          <View style={styles.wrapper}>
            <Text style={styles.message}>
              {'Your Online library is empty!'}
            </Text>
            <Text style={styles.message}>
              {'Add some books via Link to get started'}
            </Text>
          </View>
        </View>
      );
    }
    return (
      <View>
        <FlatList
          data={books}
          renderItem={renderItem}
          keyExtractor={item => item.bookUrl}
        />
      </View>
    );
  };
  return <>{render()}</>;
}

const mapStateToProps = state => ({
  books: state.recentBooks,
});

export default connect(mapStateToProps)(OnlineBookLibraryScreen);

const styles = {
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  title: {
    fontSize: 15,
    marginBottom: 3,
    color: '#000000',
  },
  author: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.8)',
  },
  section: { marginTop: 7, backgroundColor: Colors.light },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 15,
  },
};
