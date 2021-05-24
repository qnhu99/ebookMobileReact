import React, { useState } from 'react';
import { View, TouchableOpacity, Dimensions } from 'react-native';
import { contrastColor } from '../constants';
import GlobalSettings from '../components/globalSettings';

const { height } = Dimensions.get('window');

function SettingsScreen(props) {
  return (
    <>
      <GlobalSettings />
    </>
  );
}

export default SettingsScreen;

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
};
