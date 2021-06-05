import React from 'react';
import { View, Text } from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';
import { settings } from '../../constants';

function Theme(props) {
  const selections = settings[0].items;
  const initialValue =
    selections.findIndex(elements => elements.label === props.initial.label) +
    1;
  return (
    <View style={styles.wrapper}>
      <Text style={styles.header}>Theme</Text>
      <RadioButtonRN
        initial={initialValue}
        data={selections}
        selectedBtn={e => props.handleChange(e)}
        box={false}
      />
    </View>
  );
}

export default Theme;

const styles = {
  wrapper: { paddingBottom: 10 },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  select: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
  },
};
