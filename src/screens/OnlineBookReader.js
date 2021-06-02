import React, { useState } from 'react';
import useSWR from 'swr';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import Icon from '../components/Icon';
import SideMenu from 'react-native-side-menu';
import ChapterContent from '../components/ChapterContent';
import Icons from '../res/icons';
import Loading from '../components/Loading';
import axios, { BookApi } from 'src/api';
import { connect } from 'react-redux';
import * as actions from '../actions/onlineBook';

import { contrastColor } from '../constants';
const { height: full_height } = Dimensions.get('window');
const { width: full_width } = Dimensions.get('window');

const sections = [
  { name: 'contents', icon: 'book-open' },
  { name: 'settings', icon: 'settings' },
];

function Contents(props) {
  const navigation = useNavigation();
  const { tableOfContent } = props;
  const redirectToReader = chapter => {
    navigation.navigate('online-book-reader', {
      chapter,
      tableOfContent,
    });
  };
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContent}
    >
      {tableOfContent.map((season, index_season) => {
        return (
          <View key={index_season} style={styles.seasonTitle.container}>
            <Text style={styles.seasonTitle.text}>{season.season_name}</Text>
            {season.chapters.map((chapter, index_chapter) => (
              <TouchableOpacity
                key={index_chapter}
                onPress={() => redirectToReader(chapter)}
                style={{
                  height: 40,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}
              >
                <Text
                  style={{
                    width: full_width * 0.6,
                    fontSize: 15,
                  }}
                  numberOfLines={1}
                >
                  {chapter.chapter_name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        );
      })}
    </ScrollView>
  );
}

function Drawer(props) {
  const [currentSection, setCurrentSection] = useState('contents');
  function renderSection() {
    switch (currentSection) {
      case 'contents':
        return <Contents {...props} />;
      // case 'settings':
      //   return <Settings />;
      default:
        return null;
    }
  }
  return (
    <View style={styles.wrapper}>
      <View
        style={{
          flexDirection: 'row',
          paddingRight: 15,
          paddingBottom: 10,
        }}
      >
        {sections.map(({ name, icon }, i) => (
          <TouchableOpacity
            onPress={() => setCurrentSection(name)}
            style={
              currentSection === name
                ? [styles.sectionButton, styles.selectedSectionButton]
                : styles.sectionButton
            }
            key={i}
          >
            <Icon name={icon} size={22} color={contrastColor} />
          </TouchableOpacity>
        ))}
      </View>
      {renderSection()}
    </View>
  );
}

function OnlineBookReader(props) {
  const navigation = useNavigation();
  const { chapter, tableOfContent } = props.route.params;
  const [isDrawer, setDrawer] = useState(false);
  const { chapter_link: link, chapter_index, season_index } = chapter;
  const { data, error } = useSWR(link, url =>
    axios(BookApi.getChapterContent(url)).then(res => res.data),
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
            onPress={() => console.log('press')}
          />
        </View>
      ),
    });
    const menu = <Drawer tableOfContent={tableOfContent} />;
    return (
      <ChapterContent data={{ ...data, ...chapter }} />
      // <SideMenu
      //   menu={menu}
      //   isOpen={isDrawer}
      //   menuPosition="right"
      //   onChange={() => setDrawer(!isDrawer)}
      // >
      //   <ChapterContent data={data} />
      // </SideMenu>
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
    width: '33.33%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedSectionButton: {
    borderColor: contrastColor,
    borderBottomWidth: 2,
  },
};
