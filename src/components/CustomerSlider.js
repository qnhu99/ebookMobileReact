import React from 'react';
import { View, Text, Picker, Slider } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { primaryColor } from '../constants';

function CustomSlider(props) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>{`${props.text}: ${props.settings[props.id]}`}</Text>
      <View style={styles.pickerWrapper}>
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
    // width: '90%',
    justifyContent: 'center',
    // borderWidth: 1,
    // borderColor: "gray",
    // borderRadius: 4,
  },
  text: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  picker: {
    width: '100%',
  },
  slider: {
    width: '95%',
    height: 6,
  },
};
