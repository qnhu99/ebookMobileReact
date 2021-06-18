import React from 'react';
import { View, Text, Slider } from 'react-native';

const CustomSlider = props => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{props.title}</Text>
      <View style={styles.pickerWrapper}>
        <Slider
          style={styles.slider}
          step={props.step}
          value={props.value}
          minimumValue={props.minimumValue}
          maximumValue={props.maximumValue}
          onSlidingComplete={props.onSlidingComplete}
          onValueChange={props.onValueChange}
        />
      </View>
    </View>
  );
}

export default CustomSlider;

const styles = {
  wrapper: {
    width: '100%',
    height: 70,
    justifyContent: 'space-evenly',
    marginTop: 15,
  },
  pickerWrapper: {
    height: 35,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
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
