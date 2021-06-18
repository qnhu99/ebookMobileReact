import React from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const PickerListItem = props => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>{props.title}</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          prompt={props.prompt}
          selectedValue={props.selectedValue}
          onValueChange={props.onValueChange}
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
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  picker: {
    width: '100%',
  },
};
