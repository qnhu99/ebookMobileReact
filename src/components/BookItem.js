import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import OptionsModal from './OptionsModal';
import { ListItem } from 'react-native-elements';
import showToast from './Toast';
import { contrastColor } from '../constants';
import { connect } from 'react-redux';
import * as actions from '../actions';

const ScreenWidth = Dimensions.get('window').width;

function BookItem(props) {
  const [isModalVisible, setModalVisible] = useState(false);

  async function onPress() {
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
          onRemove={() => {
            setModalVisible(false);
            props.removeBook(props.index);
          }}
        />
      </ListItem>
    </>
  );
}

export default connect(null, actions)(BookItem);

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
