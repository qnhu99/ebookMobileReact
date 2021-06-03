import React, { useState } from 'react';
import { View, Dimensions, TouchableOpacity, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import TableContent from './TableContent';
import Settings from './Settings';
import { contrastColor } from '../../constants';
const { height: full_height } = Dimensions.get('window');

const sections = [
  { name: 'contents', icon: 'book-open' },
  { name: 'settings', icon: 'settings' },
];

function MenuDrawer(props) {
  const [currentSection, setCurrentSection] = useState('contents');
  function renderSection() {
    switch (currentSection) {
      case 'contents':
        return <TableContent {...props} />;
      case 'settings':
        return <Settings />;
      default:
        return null;
    }
  }
  return (
    <View style={styles.wrapper}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          paddingHorizontal: 15,
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
            <Icon name={icon} size={22} color={contrastColor} type="feather" />
          </TouchableOpacity>
        ))}
      </View>
      {renderSection()}
    </View>
  );
}

export default MenuDrawer;

const styles = {
  wrapper: {
    flex: 1,
    height: full_height,
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
