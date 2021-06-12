import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { ListItem, Avatar, Divider } from 'react-native-elements';
import { connect } from 'react-redux';
import Colors from 'src/res/colors';
import LoadingForDetail from './LoadingForDetail';

const Item = ({ data, index, setLoading, setUrl }) => {
  return (
    <ListItem
      key={index}
      bottomDivider
      onPress={() => {
        setLoading(true);
        setUrl(data.bookUrl);
      }}
    >
      <Avatar source={{ uri: data.imgUrl }} size="large" />
      <ListItem.Content>
        <ListItem.Title numberOfLines={2}>{data.bookName}</ListItem.Title>
        <ListItem.Subtitle>{data.bookAuthor}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

function RecentBookList(props) {
  const fontFamily = props.globalSettings.fontFamily;
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);
  const [url, setUrl] = React.useState('');
  const renderItem = () => {
    return props.list
      .slice(0, 10)
      .map((item, index) => (
        <Item
          data={item}
          key={index}
          index={index}
          setLoading={setLoading}
          setUrl={setUrl}
        />
      ));
  };
  const renderSection = () => {
    if (props.list.length === 0) {
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
            {'Your Online library is empty!'}
          </Text>
          <Text style={{ ...styles.message, fontFamily }}>
            {'Add some books via Link to get started'}
          </Text>
        </View>
      );
    }
    return <View>{renderItem()}</View>;
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Recent Online Books</Text>
      {renderSection()}
      <Divider />
      <TouchableOpacity
        style={{ paddingVertical: 5 }}
        onPress={() => navigation.navigate('online-book-library')}
      >
        <Text style={{ textAlign: 'center', fontSize: 16 }}>{'View more'}</Text>
      </TouchableOpacity>
      <LoadingForDetail
        show={loading}
        url={url}
        handleSuccess={() => {
          setLoading(false);
        }}
        handleError={() => {
          setLoading(false);
        }}
      />
    </View>
  );
}

const mapStateToProps = state => {
  return { list: state.recentBooks, globalSettings: state.globalSettings };
};

export default connect(
  mapStateToProps,
  null,
)(RecentBookList);

const ScreenWidth = Dimensions.get('window').width;

const styles = {
  wrapper: {
    height: 65,
    width: ScreenWidth,
    paddingLeft: 15,
    paddingRight: 15,
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
