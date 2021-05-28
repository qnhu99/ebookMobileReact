import React from 'react';
import { View, Text, Picker, Slider } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { primaryColor } from '../constants';

function CustomSlider(props) {
  const fontFamily = props.globalSettings.fontFamily;

  return (
    <View style={{ ...styles.wrapper, fontFamily }}>
      <Text style={{ ...styles.text, fontFamily }}>{`${props.text}: ${props.settings[props.id]}`}</Text>
      <View style={{ ...styles.pickerWrapper, fontFamily }}>
        <Slider
          style={styles.slider}
          step={props.step}
          value={props.convertBackward(props.settings[props.id])}
          minimumValue={props.minValue}
          maximumValue={props.maxValue}
          // minimumTrackTintColor={props.fg}
          // thumbTintColor={props.fg}
          onSlidingComplete={val => props.updateSettings({ [props.id]: props.convertFunc(val) })}
        />
      </View>
    </View>
  );
}

function mapStateToProps(state) {
  return {
    settings: state.settings,
    globalSettings: state.globalSettings
  };
}

export default connect(
  mapStateToProps,
  actions,
)(CustomSlider);

const styles = {
  wrapper: {
    width: '100%',
    height: 70,
    justifyContent: 'space-evenly',
    marginTop: 15,
  },
  pickerWrapper: {
    height: 35,
    width: '90%',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: primaryColor,
    borderRadius: 4,
  },
  text: {
    fontSize: 16,
    paddingLeft: 2,
    paddingBottom: 6,
  },
  picker: {
    width: '100%',
  },
  slider: {
    width: '95%',
    height: 6,
  },
};
