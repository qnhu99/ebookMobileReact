import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Text, View, FlatList, Alert } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import Colors from 'src/res/colors';
import LoadingForDetail from 'src/components/LoadingForDetail';

const Item = ({ data, handlePress }) => {
  return (
    <ListItem bottomDivider onPress={() => handlePress(data.bookUrl)}>
      <Avatar source={{ uri: data.imgUrl }} size="large" />
      <ListItem.Content>
        <ListItem.Title numberOfLines={2}>{data.bookName}</ListItem.Title>
        <ListItem.Subtitle>{data.bookAuthor}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

function OnlineBookLibraryScreen(props, { navigation }) {
  const { books } = props;
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('');
  const [error, setError] = useState(null);
  useEffect(() => {
    if (error) {
      const message = error.message;
      Alert.alert('Error', message);
      setError(null);
    }
  }, [error]);

  const handlePress = bookUrl => {
    setLoading(true);
    setUrl(bookUrl);
  };

  const renderItem = ({ item }) => (
    <Item
      data={{ ...item.bookInfo, bookUrl: item.bookUrl }}
      handlePress={handlePress}
    />
  );

  const render = () => {
    if (books.length === 0) {
      return (
        <View style={styles.wrapper}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
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
      <>
        <FlatList
          data={books}
          renderItem={renderItem}
          keyExtractor={item => item.bookUrl}
        />
        <LoadingForDetail
          show={loading}
          url={url}
          handleSuccess={newData => {
            setLoading(false);
            navigation.navigate('online-book-detail', { data: newData });
          }}
          handleError={newError => {
            setLoading(false);
            setError(newError);
          }}
          handleCancel={() => {
            setLoading(false);
          }}
        />
      </>
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
