import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { connect } from 'react-redux';
import { View, Text, Dimensions, Alert } from 'react-native';
import SideMenu from 'react-native-side-menu-updated';
import ChapterContent from './ChapterContent';
import Icons from '../../res/icons';
import Loading from '../../components/Loading';
import axios, { BookApi } from 'src/api';
import * as actions from '../../actions';
import MenuDrawer from './MenuDrawer';
import { contrastColor } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import LoadingForChapter from 'src/components/LoadingForChapter';

const { height: full_height } = Dimensions.get('window');

function OnlineBookReader(props) {
  const [chapterURL, setChapterURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (error) {
      const message = error.message;
      Alert.alert('Error', message);
      setError(null);
    }
  }, [error]);
  const data = props.route.params.data;
  useEffect(() => {
    Object.keys(data).forEach(prop => console.log(prop));
    props.updateRecentOnlineChapter(data.chapterURL);
  });
  const handlePressChapter = url => {
    setLoading(true);
    setChapterURL(url);
  };
  const navigation = useNavigation();
  const [isDrawer, setDrawer] = useState(false);

  navigation.setOptions({
    headerShown: true,
    title: data.chapter_title,
    headerRight: () => (
      <View style={styles.iconWrapper}>
        <Icons.menu
          size={20}
          style={styles.headerIcon}
          onPress={() => setDrawer(!isDrawer)}
        />
      </View>
    ),
  });

  const menu = (
    <MenuDrawer setDrawer={setDrawer} handlePressChapter={handlePressChapter} />
  );
  return (
    <SideMenu
      menu={menu}
      isOpen={isDrawer}
      menuPosition="right"
      onChange={() => setDrawer(!isDrawer)}
    >
      <ChapterContent data={data} handlePressChapter={handlePressChapter} />
      <LoadingForChapter
        show={loading}
        url={chapterURL}
        handleSuccess={newData => {
          setLoading(false);
          navigation.navigate('online-book-reader', {
            data: { ...newData, chapterURL },
          });
        }}
        handleError={newError => {
          setLoading(false);
          setError(newError);
        }}
        handleCancel={() => {
          setLoading(false);
        }}
      />
    </SideMenu>
  );
}

const mapStateToProps = state => ({ currentBook: state.recentBooks[0] });

export default connect(
  mapStateToProps,
  actions,
)(OnlineBookReader);

const styles = {
  wholeScreen: { flex: 1 },
  headerIcon: { padding: 5 },
  iconWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 100,
  },
  // Drawer
  wrapper: {
    flex: 1,
    height: full_height,
    paddingTop: 10,
    paddingLeft: 15,
  },
  sectionButton: {
    height: 50,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedSectionButton: {
    borderColor: contrastColor,
    borderBottomWidth: 2,
  },
};
