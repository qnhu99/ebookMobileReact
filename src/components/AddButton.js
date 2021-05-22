import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Overlay, Icon, Button, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';

// Components
import ErrorAlert from './ErrorAlert';
// import Icon from "./Icon";
import { primaryColor } from '../constants';
import dimensions from 'src/res/dimensions';

import axios, { BookApi } from '../api';

function AddButton(props) {
  const navigation = useNavigation();
  const [errorSubmitEmptyInput, setErrorSubmitEmptyInput] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleInputLink, setVisibleInputLink] = useState(false);
  const [inputLink, onChangeInput] = React.useState('');
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const toggleInputLinkOverlay = () => {
    setVisibleInputLink(!visibleInputLink);
  };

  const onPressSendLink = () => {
    if (inputLink.trim().length === 0) {
      setErrorSubmitEmptyInput(true);
      console.log(errorSubmitEmptyInput);
      return;
    }
    axios(BookApi.getBookDetail(inputLink))
      .then(res => {
        setVisible(false);
        setVisibleInputLink(false);
        navigation.navigate('online-book-detail', { data: res.data });
      })
      .catch(err => {
        setErrorSubmitEmptyInput(false);
        return ErrorAlert({ errorMessage: err.message });
      });
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={toggleOverlay}>
        <View style={styles.view}>
          <Icon name="plus" type="feather" color="white" size={28} />
        </View>
      </TouchableWithoutFeedback>
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        animationType={'fade'}
      >
        <Button
          title="Open book via link"
          onPress={toggleInputLinkOverlay}
          type="clear"
        />
        <Button
          title="Open new files"
          onPress={() => {
            setVisible(false);
            props.addBook({ navigation: navigation });
          }}
          type="clear"
        />
      </Overlay>
      <Overlay
        isVisible={visibleInputLink}
        onBackdropPress={toggleInputLinkOverlay}
        backdropStyle={{ backgroundColor: 'rgba(52, 52, 52, 0)' }}
        animationType={'fade'}
        overlayStyle={{
          width: dimensions.full_width - 30,
          height: 170,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <View style={{ flex: 4 }}>
              <Input
                label="Open via link"
                placeholder="Book link"
                onChangeText={onChangeInput}
                value={inputLink}
                errorMessage={errorSubmitEmptyInput ? 'Empty input' : ''}
                // style={{
                //   borderColor: errorSubmitEmptyInput ? 'red' : 'transparent',
                // }}
              />
            </View>
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <Button
                containerStyle={{ marginTop: 30, marginRight: 10 }}
                title="Paste"
              />
            </View>
          </View>

          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Button
              type="clear"
              title="Cancel"
              onPress={toggleInputLinkOverlay}
              containerStyle={{ width: 85 }}
            />

            <Button
              title="Continue"
              containerStyle={{ marginLeft: 25, width: 85 }}
              onPress={onPressSendLink}
            />
          </View>
        </View>
      </Overlay>
    </>
  );
}

export default connect(
  null,
  actions,
)(AddButton);

const styles = {
  view: {
    backgroundColor: primaryColor,
    position: 'absolute',
    bottom: 20,
    right: 20,
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  icon: {
    name: 'plus',
    type: 'feather',
    color: 'white',
    size: 28,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
};
