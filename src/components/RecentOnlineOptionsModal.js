import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Icon from './Icon';

const { height, width } = Dimensions.get('window');

function RecentOnlineOptionsModal({
  url,
  visible,
  hideModal,
  removeRecentOnlineBook,
}) {
  const onRemove = () => {
    hideModal();
    removeRecentOnlineBook(url);
  };
  return (
    <Modal
      style={styles.modal}
      isVisible={visible}
      deviceHeight={height}
      onBackButtonPress={hideModal}
      onBackdropPress={hideModal}
      onSwipeComplete={hideModal}
      backdropColor="rgba(0, 0, 0, 0.5)"
      swipeDirection="down"
      animationOutTiming={100}
      animationInTiming={100}
      hideModalContentWhileAnimating
    >
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.item} onPress={onRemove}>
          <Icon {...icons.remove} style={styles.icon} />
          <Text style={styles.text}>Remove</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

export default connect(
  null,
  actions,
)(RecentOnlineOptionsModal);

const styles = {
  modal: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  wrapper: {
    height: 60,
    width: width - 16,
    backgroundColor: '#F7F8FB',
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
  remove: {
    name: 'trash-2',
    type: 'feather',
    size: 20,
  },
};
