import React from 'react';
import { View, ScrollView } from 'react-native';
import Theme from './Theme';
import FontSize from './FontSize';
import LineHeight from './LineHeight';
import { settings } from '../../constants';

function Settings(props) {
  return (
    <View style={styles.wrapper}>
      <ScrollView>
        <Theme setup={settings[0]} />
        <FontSize setup={settings[1]} />
        <LineHeight setup={settings[2]} />
      </ScrollView>
    </View>
  );
}

export default Settings;

const styles = {
  wrapper: { paddingHorizontal: 10, paddingVertical: 10 },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
  },
};
