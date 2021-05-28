import React, { useState } from 'react';
import { View, TouchableOpacity, Dimensions, Text } from 'react-native';
import Icon from './Icon';
import Contents from './Contents';
import BookSearch from './BookSearch';
import Bookmark from './Bookmark';
import Settings from './Settings';
import { contrastColor } from '../constants';

const { height } = Dimensions.get('window');

function Drawer(props) {
  let sections = [
    { name: 'contents', icon: 'book-open' },
    { name: 'bookmark', icon: 'bookmark' },
    { name: 'search', icon: 'search' },
    { name: 'settings', icon: 'settings' },
  ];

  if (props.drawerType === 'pdf') {
    sections = [
      { name: 'bookmark', icon: 'bookmark' },
      { name: 'settings', icon: 'settings' },
    ]
  }

  const [currentSection, setCurrentSection] = useState(sections[0].name);

  function renderSection() {
    switch (currentSection) {
      case 'contents':
        return <Contents {...props} />;
      case 'search':
        return <BookSearch {...props} />;
      case 'settings':
        return <Settings />;
      default:
        return <Bookmark {...props} />;
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

export default Drawer;

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
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedSectionButton: {
    borderColor: contrastColor,
    borderBottomWidth: 2,
  },
};
