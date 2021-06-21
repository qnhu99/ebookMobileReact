import React from 'react';
import { View, TextInput, Dimensions } from 'react-native';
import Icon from './Icon';
import { contrastColor } from '../constants';

const HEIGHT = 56;
const WIDTH = Dimensions.get('window').width;

function SearchBar(props) {
  return (
    <View style={styles.wrapper}>
      <Icon
        name="arrow-left"
        size={24}
        color={contrastColor}
        onPress={props.hide}
        style={styles.icon}
      />
      <TextInput
        style={styles.input}
        placeholder="Search"
        allowFontScaling={false}
        placeholderTextColor="rgba(0, 0, 0, 0.7)"
        autoCorrect={false}
        autoFocus={true}
        returnKeyType="search"
        value={props.value}
        onChangeText={props.setValue}
        onBlur={() => !props.value && props.hide()}
      />
      <Icon
        name="x"
        size={24}
        color={contrastColor}
        onPress={() => props.setValue('')}
        style={styles.icon}
      />
    </View>
  );
}

export default SearchBar;

const styles = {
  wrapper: {
    height: HEIGHT,
    width: WIDTH,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    elevation: 5,
    backgroundColor: '#ffffff',
  },
  icon: {
    paddingLeft: 14,
    paddingRight: 14,
  },
  input: {
    flex: 1,
    fontSize: 17,
    height: HEIGHT,
    color: contrastColor,
    paddingLeft: 10,
    paddingRight: 5,
  },
};
