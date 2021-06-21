import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';


export default function Icon(props) {
  switch (props.type) {
    case 'material':
      return <MaterialIcon {...props} />;
    case 'community':
      return <MaterialCommunityIcon {...props} />;
    default:
      return <FeatherIcon {...props} />;
  }
}
