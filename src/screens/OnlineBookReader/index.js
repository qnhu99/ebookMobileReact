import React, { useState } from 'react';
import useSWR from 'swr';
import { connect } from 'react-redux';
import { View, Text, Dimensions } from 'react-native';
import SideMenu from 'react-native-side-menu-updated';
import ChapterContent from './ChapterContent';
import Icons from '../../res/icons';
import Loading from '../../components/Loading';
import axios, { BookApi } from 'src/api';
import * as actions from '../../actions';
import MenuDrawer from './MenuDrawer';
import { contrastColor } from '../../constants';
import { useNavigation } from '@react-navigation/native';

const { height: full_height } = Dimensions.get('window');

const Error = props => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
      Something went wrong...
    </Text>
    <Text style={{ fontSize: 16 }}>{props.message}</Text>
  </View>
);

const fetcher = url =>
  axios(BookApi.getChapterContent(url)).then(res => {
    return res.data;
  });

function OnlineBookReader(props) {
  const navigation = useNavigation();
  const { link } = props.route.params;
  const [isDrawer, setDrawer] = useState(false);

  const { data, error } = useSWR(link, fetcher, {
    refreshInterval: 1000,
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      if (error.status === 404) return;
      if (retryCount >= 10) return;
      setTimeout(() => revalidate({ retryCount }), 5000);
    },
  });

  if (error) {
    navigation.setOptions({ title: 'Error', headerShown: true });
    return <Error message={error.message} />;
  }

  if (data) {
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
    props.updateRecentOnlineChapter(link);
    const menu = <MenuDrawer setDrawer={setDrawer} />;
    return (
      <SideMenu
        menu={menu}
        isOpen={isDrawer}
        menuPosition="right"
        onChange={() => setDrawer(!isDrawer)}
      >
        <ChapterContent data={data} />
      </SideMenu>
    );
  } else {
    navigation.setOptions({ headerShown: false });
    return <Loading />;
  }
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
