import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Text,
} from 'react-native';
import Icon from './Icon';
import { contrastColor } from '../constants';
import { useNavigation } from '@react-navigation/core';
const { height } = Dimensions.get('window');
const sections = [
  { name: 'contents', icon: 'book-open' },
  { name: 'search', icon: 'search' },
  { name: 'settings', icon: 'settings' },
  { name: 'bookmark', icon: 'bookmark' },
];

function ContentItem(props) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => console.log('test')}
      style={styles.wrapper}
    >
      <Text style={styles.text} numberOfLines={1}>
        {props.label}
      </Text>
    </TouchableOpacity>
  );
}

function Content(props) {
  const { seasons } = props.data;
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContent}
    >
      {seasons.map((item, i) => (
        <ContentItem {...item} key={i} onPress={props.goToLocation} />
      ))}
    </ScrollView>
  );
}

function DrawerOnline(props, { tableOfContent }) {
  const [currentSection, setCurrentSection] = useState('contents');

  function renderSection() {
    switch (currentSection) {
      case 'contents':
        return <Content data={{ seasons: tableOfContent }} />;
      // case 'search':
      //   return <BookSearch />;
      // case 'settings':
      //   return <Settings />;
      default:
        return null;
    }
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.iconWrapper}>
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

export default DrawerOnline;

const styles = {
  wrapper: {
    flex: 1,
    height,
    paddingTop: 10,
    paddingLeft: 15,
  },
  iconWrapper: {
    flexDirection: 'row',
    paddingRight: 15,
    paddingBottom: 10,
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
  scrollView: { flex: 1 },
  scrollViewContent: {
    alignItems: 'flex-start',
    paddingBottom: 50,
  },
};
