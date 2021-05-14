import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { LOGOS, ICONS } from 'src/res';

import styles from './styles';

const MainHeader = () => (
  <View style={styles.container}>
    <View style={styles.header}>
      <View>
        <LOGOS.sm />
      </View>
      <View style={styles.iconContainer}>
        <ICONS.SEARCH
          style={{ paddingLeft: 5 }}
          onPress={() => console.log('Pressed search')}
          size={27}
        />
        <ICONS.PLUS
          style={{ paddingLeft: 5 }}
          onPress={() => console.log('Pressed add')}
          size={27}
        />
      </View>
    </View>
  </View>
);

export default MainHeader;
