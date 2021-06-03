import React, { useState } from 'react';
import useSWR from 'swr';
import { View, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import SideMenu from 'react-native-side-menu-updated';
import ChapterContent from './ChapterContent';
import Icons from '../../res/icons';
import Loading from '../../components/Loading';
import axios, { BookApi } from 'src/api';
import * as actions from '../../actions/onlineBook';
import MenuDrawer from './MenuDrawer';

import { contrastColor } from '../../constants';
const { height: full_height } = Dimensions.get('window');

function OnlineBookReader(props) {
  const navigation = useNavigation();
  const { chapter, tableOfContent } = props.route.params;
  const [isDrawer, setDrawer] = useState(false);
  const { chapter_link: link, chapter_index, season_index } = chapter;
  const { data, error } = useSWR(
    link,
    url =>
      axios(BookApi.getChapterContent(url)).then(res => {
        setDrawer(false);
        return res.data;
      }),
    {
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // Never retry on 404.
        if (error.status === 404) return;
        // Only retry up to 10 times.
        if (retryCount >= 10) return;
        // Retry after 5 seconds.
        setTimeout(() => revalidate({ retryCount }), 5000);
      },
    },
  );

  if (error) {
    navigation.setOptions({ title: 'Error', headerShown: true });
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          Something went wrong...
        </Text>
        <Text style={{ fontSize: 16 }}>{error.message}</Text>
      </View>
    );
  }

  if (!data) {
    navigation.setOptions({ headerShown: false });
    return <Loading loading={true} />;
  } else {
    props.updateRecentChapter({ chapter_index, season_index });
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
      <MenuDrawer tableOfContent={tableOfContent} currentChapterLink={link} />
    );
    return (
      <SideMenu
        menu={menu}
        isOpen={isDrawer}
        menuPosition="right"
        onChange={() => setDrawer(!isDrawer)}
      >
        <ChapterContent data={{ ...data, ...chapter }} />
      </SideMenu>
    );
  }
}

export default connect(
  null,
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
