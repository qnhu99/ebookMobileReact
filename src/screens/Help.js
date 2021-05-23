import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, Dimensions } from 'react-native';
import { contrastColor } from '../constants';
import { connect } from 'react-redux';

const { height } = Dimensions.get('window');

function Help(props) {

  return (
    <ScrollView style={styles.wrapper} contentContainerStyle={styles.wrapperContent}>
      <Text style={styles.heading}>Ebook Reader</Text>
      <Text style={styles.text}>
        &quot;Save your favorite stories&quot; and find more in the internet.{' '}
        <Text style={styles.emphasize}>
          Ebook Reader help you read ebook from your device and stories from tangthuvien.vn
				</Text>
      </Text>

    </ScrollView>
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
