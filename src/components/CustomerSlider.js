import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Slider } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';

function CustomSlider(props) {
  return (
    <View style={{ ...styles.wrapper, }}>
      <Text style={styles.header}>{`${props.text}: ${props.settings[props.id]}`}</Text>
      <View style={{ ...styles.pickerWrapper, }}>
        <Slider
          thumbStyle={styles.thumb}
          trackStyle={styles.track}
          value={props.convertBackward(props.settings[props.id])}
          onValueChange={
            (val) => { props.updateSettings({ [props.id]: props.convertFunc(val) }); }
          }
          minimumValue={props.minValue}
          maximumValue={props.maxValue}
          step={props.step}
          minimumTrackTintColor="transparent"
        />
      </View>
    </View >
  );
}

const mapStateToProps = state => ({
  settings: state.settings,
  globalSettings: state.globalSettings
});

export default connect(mapStateToProps, actions)(CustomSlider);

const styles = {
  wrapper: {
    width: '100%',
    height: 70,
    justifyContent: 'space-evenly',
    marginTop: 15,
  },
  header: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  pickerWrapper: {
    height: 35,
    width: '90%',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    paddingLeft: 2,
    paddingBottom: 4,
  },
  thumb: {
    height: 30,
    width: 20,
    borderRadius: 50,
    backgroundColor: '#4166f5',
  },
  track: {
    height: 10,
    borderRadius: 50,
    backgroundColor: 'transparent',
  }
};
