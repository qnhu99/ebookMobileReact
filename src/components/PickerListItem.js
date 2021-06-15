import React from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { primaryColor } from '../constants';

function PickerListItem(props) {
  const fontFamily = props.globalSettings.fontFamily;
  return (
    <View style={{ ...styles.wrapper, fontFamily }}>
      <Text style={{ ...styles.text, fontFamily }}>{props.text}</Text>
      <View style={{ ...styles.pickerWrapper, fontFamily }}>
        <Picker
          prompt={props.title}
          selectedValue={props.settings[props.id]}
          onValueChange={val => { console.log(val); props.updateSettings({ [props.id]: val }); }}
          style={styles.picker}
        >
          {props.items.map((item, i) => (
            <Picker.Item label={item.label} value={item.value} key={i} />
          ))}
        </Picker>
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
)(PickerListItem);

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
};
