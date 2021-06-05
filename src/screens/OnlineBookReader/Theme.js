import React from 'react';
import { View, Text } from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';

function Theme(props) {
  const selections = props.setup.items;
  const [value, setValue] = React.useState(selections[0].value);
  return (
    <View style={styles.wrapper}>
      <Text style={styles.header}>Theme</Text>
      <RadioButtonRN
        data={selections}
        selectedBtn={e => console.log(e)}
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
