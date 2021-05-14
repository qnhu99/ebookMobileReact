import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import styles from './styles';
import { Image } from 'react-native-elements';
import { DIMENSIONS } from 'src/res';
export default function Detail(props) {
  const data = props.data;
  console.log(data.cover_img_url);
  return (
    <View
      style={{
        backgroundColor: 'red',
        alignContent: 'flex-start',
      }}>
      <Image
        source={{ uri: data.cover_img_url }}
        style={{
          width: '100%',
          height: DIMENSIONS.FULL_HEIGHT - 100,
          resizeMode: 'contain',
        }}
        PlaceholderContent={<ActivityIndicator />}
      />
    </View>
  );
}
``