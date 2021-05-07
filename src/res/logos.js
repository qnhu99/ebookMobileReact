import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';

const LOGOS = {
  sm: (props) => (
    <Image
      style={{ width: 40, height: 40 }}
      source={require('src/assets/images/book.png')}
      {...props}
    />
  ),
};

export default LOGOS;
