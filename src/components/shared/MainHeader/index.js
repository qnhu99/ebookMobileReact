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
        {/* <Button title="Search" icon={ICONS.SEARCH()} type="clear" /> */}

        {/* <IconButton
          icon={Icons.search}
          size={22}
          onPress={() => console.log("Pressed")}
          style={{
            marginHorizontal: 1,
          }}
        />
        <IconButton
          icon={Icons.plus}
          size={22}
          onPress={() => console.log("Pressed")}
          style={{
            marginHorizontal: 1,
          }}
        /> */}
      </View>
    </View>
  </View>
);

export default MainHeader;
