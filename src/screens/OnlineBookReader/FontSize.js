import React from 'react';
import { View, Text } from 'react-native';
import { Slider } from 'react-native-elements';
function FontSize(props) {
  const selections = props.setup.items;
  const [size, setSize] = React.useState(16);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.header}>Font size</Text>
      <View
        style={{
          flex: 1,
          alignItems: 'stretch',
          justifyContent: 'center',
          paddingHorizontal: 20,
        }}
      >
        <Slider
          thumbStyle={{
            height: 30,
            width: 20,
            backgroundColor: '#4166f5',
          }}
          trackStyle={{
            height: 10,
            borderRadius: 50,
            backgroundColor: 'transparent',
          }}
          value={size}
          onValueChange={value => setSize(value)}
          maximumValue={24}
          minimumValue={15}
          step={1}
          minimumTrackTintColor="transparent"
        />
      </View>
    </View>
  );
}

export default FontSize;

const styles = {
  wrapper: { paddingBottom: 10 },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
  },
};
