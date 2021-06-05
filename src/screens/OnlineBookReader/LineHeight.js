import React from 'react';
import { View, Text } from 'react-native';
import { Slider } from 'react-native-elements';
function LineHeight(props) {
  const selections = props.setup.items;
  const [sliderValue, setSliderValue] = React.useState(1);
  const [lineHeight, setLineHeight] = React.useState(1.4);
  return (
    <View style={styles.wrapper}>
      <Text style={styles.header}>Line Height</Text>
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
          value={sliderValue}
          onValueChange={value => {
            setSliderValue(value);
            setLineHeight((1.4 + 0.2 * value).toFixed(1));
          }}
          maximumValue={5}
          minimumValue={0}
          step={1}
          minimumTrackTintColor="transparent"
        />
        <Text>{lineHeight}</Text>
      </View>
    </View>
  );
}

export default LineHeight;

const styles = {
  wrapper: { paddingBottom: 10 },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
  },
};
