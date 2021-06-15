import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { View, Dimensions, Alert } from 'react-native';
import SideMenu from 'react-native-side-menu-updated';
import ChapterContent from './ChapterContent';
import Icons from '../../res/icons';
import MenuDrawer from './MenuDrawer';
import { contrastColor } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import LoadingForChapter from 'src/components/LoadingForChapter';
const { height: full_height } = Dimensions.get('window');

function OnlineBookReader(props) {
  const navigation = useNavigation();
  const [isDrawer, setDrawer] = useState(false);
  const [chapterURL, setChapterURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const data = props.route.params.data;
  const [fetchedData, setFetchedData] = useState(data);
  useEffect(() => {
    if (error) {
      const message = error.message;
      Alert.alert('Error', message);
      setError(null);
    }
  }, [error]);

  const handlePressChapter = url => {
    setLoading(true);
    setChapterURL(url);
  };

  navigation.setOptions({
    headerShown: true,
    title: fetchedData.chapter_title,
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
      <ChapterContent
        data={fetchedData}
        handlePressChapter={handlePressChapter}
      />
      <LoadingForChapter
        show={loading}
        url={chapterURL}
        handleSuccess={newData => {
          setLoading(false);
          setFetchedData(newData);
          setDrawer(false);
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

export default connect(mapStateToProps)(OnlineBookReader);

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
