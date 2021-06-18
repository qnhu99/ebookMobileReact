import React from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const PickerListItem = props => {
  const getPickerItemLabel = props.getPickerItemLabel;
  const getPickerItemValue = props.getPickerItemValue;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>{props.title}</Text>
      <View style={{ display: 'flex', alignItems: 'center' }}>
        <View style={styles.pickerWrapper}>
          <Picker
            prompt={props.prompt}
            selectedValue={props.selectedValue}
            onValueChange={props.onValueChange}
            style={styles.picker}
          >
            {props.items.map((item, i) => (
              <Picker.Item
                key={i}
                label={getPickerItemLabel(item)}
                value={getPickerItemValue(item)}
              />
            ))}
          </Picker>
        </View>
      </View>
    </View>
  );
}

export default PickerListItem;

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
    borderColor: "gray",
    borderRadius: 4,
    display: 'flex', alignItems: 'center'
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  picker: {
    width: '100%',
  },
};
