import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import {
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import { Overlay, Icon, Button, Input } from 'react-native-elements';
// import RNFS from 'react-native-fs';
import { connect } from 'react-redux';
// import showToast from '../components/Toast';
import * as actions from '../actions';
import dimensions from 'src/constants/dimensions';
import Icons from 'src/constants/icons.js';
import Colors from 'src/constants/colors';
import Clipboard from '@react-native-clipboard/clipboard';
import LoadingForDetail from 'src/components/LoadingForDetail';

function AddButton(props) {
  const navigation = useNavigation();
  const [errorSubmitEmptyInput, setErrorSubmitEmptyInput] = useState(false);
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);
  const [visibleInputLink, setVisibleInputLink] = useState(false);
  const [inputLink, setInputLink] = React.useState(
    // 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf',
    //"https://www.gutenberg.org/ebooks/65411.epub.images?session_id=52efbda7ce1646cb919e4fc14bf3d0900b02be82"
    //"https://s3.amazonaws.com/epubjs/books/moby-dick.epub",
    '',
  );

  React.useEffect(() => {
    if (error) {
      const message = error.message;
      Alert.alert('Error', message);
      setError(null);
    }
  });

  const [loadingOnlineBookDetail, setLoadingOnlineBookDetail] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const toggleInputLinkOverlay = () => {
    setVisibleInputLink(!visibleInputLink);
    setInputLink('');
  };

  const onPressSendLink = () => {
    if (inputLink.trim().length === 0) {
      setErrorSubmitEmptyInput(true);
      return;
    }
    // setVisible(false);
    // setVisibleInputLink(false);
    // // navigation.navigate('online-book-detail', { link: inputLink });
    setLoadingOnlineBookDetail(true);
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
        <View style={{ display: 'flex', flexDirection: 'row', width: 300 }}>
          <TouchableOpacity
            style={[styles.insideBtn, { marginRight: 5 }]}
            onPress={toggleInputLinkOverlay}
          >
            <Icons.earth color={Colors.green} size={25} />
            <Text>
              Open book via link
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.insideBtn, { marginLeft: 5 }]}
            onPress={() => {
              setVisible(false);
              props.addBook({ navigation: navigation });
            }}
          >
            <Icons.file color={Colors.green} size={25} />
            <Text>
              Open new files
            </Text>
          </TouchableOpacity>
        </View>
      </Overlay>
      <Overlay
        isVisible={visibleInputLink}
        onBackdropPress={toggleInputLinkOverlay}
        backdropStyle={{ backgroundColor: 'rgba(52, 52, 52, 0)' }}
        animationType={'fade'}
        overlayStyle={{
          width: dimensions.full_width - 30,
          height: 165,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            margin: 0,
            borderColor: Colors.green,
            borderWidth: 1,
          }}
        >
          <View style={{ display: 'flex', flexDirection: 'row', padding: 0 }}>
            <Input
              containerStyle={{ marginTop: 2 }}
              inputStyle={{ fontSize: 15, paddingBottom: 2, }}
              labelStyle={{
                color: 'black',
              }}
              label="Open via link"
              placeholder="Book link"
              onChangeText={setInputLink}
              value={inputLink}
              errorMessage={errorSubmitEmptyInput ? 'Empty input' : ''}
              rightIcon={
                <TouchableOpacity
                  style={[styles.border, { padding: 5 }]}
                  onPress={async () => {
                    const text = await Clipboard.getString();
                    setInputLink(text);
                  }}
                >
                  <Text>Paste</Text>
                </TouchableOpacity>
              }
              rightIconContainerStyle={{ paddingBottom: 0, marginBottom: 0 }}
              onSelectionChange={event =>
                console.log(event.nativeEvent.selection)
              }
            />
          </View>

          <View style={styles.displayRow}>
            <Button
              type="clear"
              title="Cancel"
              onPress={toggleInputLinkOverlay}
              containerStyle={{ width: 85 }}
              titleStyle={styles.color}
            />
            <Button
              title="Continue"
              containerStyle={{ marginLeft: 25, width: 85 }}
              onPress={onPressSendLink}
              buttonStyle={styles.bgColor}
              titleStyle={styles.bgColor}
            />
          </View>
        </View>
      </Overlay>
      <LoadingForDetail
        show={loadingOnlineBookDetail}
        url={inputLink}
        handleSuccess={newData => {
          setInputLink('');
          setVisible(false);
          setVisibleInputLink(false);
          setLoadingOnlineBookDetail(false);
          navigation.navigate('online-book-detail', { data: newData });
        }}
        handleError={newError => {
          setLoadingOnlineBookDetail(false);
          setError(newError);
        }}
        handleCancel={() => {
          setLoadingOnlineBookDetail(false);
        }}
      />
    </>
  );
}

export default connect(null, actions)(AddButton);

const styles = {
  view: {
    backgroundColor: Colors.green,
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
  insideBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#5c6120",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    height: 140,
    borderRadius: 5,
  },
  border: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#5c6120",
  },
  bgColor: {
    backgroundColor: Colors.green
  },
  color: {
    color: Colors.green
  },
  displayRow: {
    display: "flex",
    flexDirection: "row",
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
