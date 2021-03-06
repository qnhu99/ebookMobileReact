import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import Share from 'react-native-share';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Icon from './Icon';
import { elevatedBG } from '../constants';

const { height, width } = Dimensions.get('window');

function OptionsModal(props) {
  function onShare() {
    props.onPressCancel();
    Share.open({
      url: `file://${props.url}`,
      type: 'application/epub+zip',
      failOnCancel: false,
    });
  }

  const isShareRender = props.isOnShareBtnEnable === undefined || props.isOnShareBtnEnable;

  return (
    <Modal
      style={styles.modal}
      isVisible={props.isVisible}
      deviceHeight={height}
      onBackButtonPress={props.onPressCancel}
      onBackdropPress={props.onPressCancel}
      onSwipeComplete={props.onPressCancel}
      backdropColor="rgba(0, 0, 0, 0.5)"
      swipeDirection="down"
      animationOutTiming={0}
      animationInTiming={500}
      hideModalContentWhileAnimating
    >
      <View style={[styles.wrapper, { height: isShareRender ? 140 : 65 }]}>
        {isShareRender && <TouchableOpacity style={styles.item} onPress={onShare}>
          <Icon {...icons.share} style={styles.icon} />
          <Text style={styles.text}>Share</Text>
        </TouchableOpacity>}
        <TouchableOpacity style={styles.item} onPress={props.onRemove}>
          <Icon {...icons.remove} style={styles.icon} />
          <Text style={styles.text}>Remove</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

export default connect(null, actions)(OptionsModal);

const styles = {
  modal: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  wrapper: {
    height: 140,
    width: width - 16,
    backgroundColor: elevatedBG,
    elevation: 5,
    justifyContent: 'space-evenly',
    marginBottom: -20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  item: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  icon: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  text: {
    fontFamily: 'Arial',
    fontSize: 15,
  },
};

const icons = {
  share: {
    name: 'share-2',
    type: 'feather',
    size: 20,
  },
  remove: {
    name: 'trash-2',
    type: 'feather',
    size: 20,
  },
};
