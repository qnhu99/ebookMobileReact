import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { ListItem, Avatar, Divider } from 'react-native-elements';
import { connect } from 'react-redux';
import Colors from 'src/constants/colors';
import LoadingForDetail from './LoadingForDetail';
import * as actions from '../actions';
import ViewmoreBtn from './ViewmoreBtn';
import OptionsModal from './OptionsModal';

const { height, width } = Dimensions.get('window');

const Item = ({ data, index, onPressItem, onLongPressItem }) => {
  return (
    <ListItem
      key={index}
      bottomDivider
      onPress={() => onPressItem(data.bookUrl)}
      onLongPress={() => onLongPressItem(data.bookUrl)}
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
  const fontFamily = 'CircularLight';
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [url, setUrl] = React.useState('');

  const onPressItem = url => {
    setLoading(true);
    setUrl(url);
  };

  const onLongPressItem = url => {
    setModalVisible(true);
    setUrl(url);
  };

  const onRemove = () => {
    setModalVisible(false);
    props.removeRecentOnlineBook(url);
  };

  const renderItem = () => {
    return props.list
      .slice(0, 10)
      .map((item, index) => (
        <Item
          data={{ ...item.bookInfo, bookUrl: item.bookUrl }}
          key={index}
          index={index}
          onPressItem={onPressItem}
          onLongPressItem={onLongPressItem}
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
    return (
      <View>
        {renderItem()}
        <OptionsModal
          isVisible={isModalVisible}
          onPressCancel={() => setModalVisible(false)}
          url={url}
          index={props.index}
          onRemove={onRemove}
          isOnShareBtnEnable={false}
        />
      </View>
    );
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Recent Online Books</Text>
      {renderSection()}
      <Divider />
      {props.list.length > 0 && <ViewmoreBtn onPress={() => navigation.navigate('online-book-library')} />}
      <LoadingForDetail
        show={loading}
        url={url}
        handleSuccess={newData => {
          setLoading(false);
          navigation.navigate('online-book-detail', { data: newData });
        }}
        handleError={() => {
          setLoading(false);
        }}
        handleCancel={() => {
          setLoading(false);
        }}
      />
    </View>
  );
}

const mapStateToProps = state => {
  return { list: state.recentBooks };
};

export default connect(
  mapStateToProps,
  actions,
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
  modal: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  wrapperModal: {
    height: 60,
    width: width - 16,
    backgroundColor: '#F7F8FB',
    elevation: 5,
    justifyContent: 'space-evenly',
    marginBottom: -20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  item: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  icon: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  text: {
    fontFamily: 'Arial',
    fontSize: 15,
  },
};

const icons = {
  remove: {
    name: 'trash-2',
    type: 'feather',
    size: 20,
  },
};
