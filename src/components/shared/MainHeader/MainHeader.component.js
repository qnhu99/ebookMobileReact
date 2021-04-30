import React from 'react';
import {View} from 'react-native';
import {LOGOS} from 'src/res';

import styles from './styles';

const MainHeader = () => (
  <View style={{overflow: 'hidden'}}>
    <View style={styles.container}>
      <LOGOS.sm />
      <View style={{flexDirection: 'row'}}></View>
    </View>
  </View>
);

export default MainHeader;
