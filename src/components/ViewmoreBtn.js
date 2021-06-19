import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Colors from 'src/constants/colors';

const ViewmoreBtn = props => (
  <TouchableOpacity
    style={{ paddingVertical: 5, backgroundColor: '#f1f2c7' }}
    onPress={props.onPress}
  >
    <Text style={{
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold',
      textDecorationLine: 'underline',
      color: Colors.darkgreen
    }}>
      {'View more'}
    </Text>
  </TouchableOpacity>
)


export default ViewmoreBtn;