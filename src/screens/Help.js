import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { contrastColor } from '../constants';
import { connect } from 'react-redux';

const { height } = Dimensions.get('window');

function Help(props) {

  return (
    <View>
      <Text style={{ fontFamily: props.globalSettings.fontFamily }}>Helper</Text>
    </View>
  );
}

function mapStateToProps(state) {
  return {
    globalSettings: state.globalSettings,
  };
}

export default connect(
  mapStateToProps,
  null,
)(Help);

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
