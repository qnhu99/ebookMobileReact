import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';

export default function Images(props) {
  return <Image {...props} PlaceholderContent={<ActivityIndicator />} />;
}
