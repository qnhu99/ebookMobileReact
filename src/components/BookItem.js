import React, { useState } from 'react';
import { Text, TouchableOpacity, Dimensions } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import OptionsModal from './OptionsModal';
import { ListItem } from 'react-native-elements';
import showToast from './Toast';
import { contrastColor } from '../constants';
import { connect } from 'react-redux';

const ScreenWidth = Dimensions.get('window').width;

export default function BookItem(props) {
  const [isModalVisible, setModalVisible] = useState(false);

  async function onPress() {
    let { isConnected, isInternetReachable } = await NetInfo.fetch();
    // if (isConnected && isInternetReachable) {
    //   props.navigation.navigate(`${props.type || 'epub' || 'pdf'}-reader`, {
    //     title: props.title,
    //     url: props.url,
    //     index: props.index,
    //   });
    // } else showToast('No internet connection');
    props.navigation.navigate(`${props.type || 'epub' || 'pdf'}-reader`, {
      title: props.title,
      url: props.url,
      index: props.index,
    });
  }

  return (
    <>
      <ListItem
        bottomDivider
        onPress={onPress}
        onLongPress={() => setModalVisible(true)}
      >
        <ListItem.Content>
          <ListItem.Title numberOfLines={2}>{props.title}</ListItem.Title>
          {props.author && <ListItem.Subtitle>{`Author: ${props.author}`}</ListItem.Subtitle>}
          <ListItem.Subtitle>{(props.type || 'EPUB').toUpperCase() + ' Document'}</ListItem.Subtitle>
        </ListItem.Content>

        <OptionsModal
          isVisible={isModalVisible}
          onPressCancel={() => setModalVisible(false)}
          url={props.url}
          index={props.index}
        />
      </ListItem>
      {/* <TouchableOpacity
        activeOpacity={0.4}
        style={styles.wrapper}
        onPress={onPress}
        onLongPress={() => setModalVisible(true)}
        key={props.index}
      >
        <Text style={styles.title} numberOfLines={1}>
          {props.title}
        </Text>
        <Text style={styles.author} numberOfLines={1}>
          {props.author || (props.type || 'EPUB').toUpperCase() + ' Document'}
        </Text>
        <OptionsModal
          isVisible={isModalVisible}
          onPressCancel={() => setModalVisible(false)}
          url={props.url}
          index={props.index}
        />
      </TouchableOpacity> */}
    </>
  );
}


const styles = {
  wrapper: {
    height: 65,
    width: ScreenWidth,
    paddingLeft: 15,
    paddingRight: 15,
  },
  title: {
    fontSize: 15,
    marginBottom: 3,
    color: contrastColor,
  },
  author: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.8)',
  },
};
