import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";

import { View, TouchableWithoutFeedback } from "react-native";

import { Overlay, Icon, Button, Input } from "react-native-elements";

import { connect } from "react-redux";
import * as actions from "../actions";
// import Icon from "./Icon";
import { primaryColor } from "../constants";
import { DIMENSIONS } from "../res";

function AddButton(props) {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [visibleInputLink, setVisibleInputLink] = useState(false);
  const [inputLink, onChangeInput] = React.useState("");
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const toggleInputLinkOverlay = () => {
    setVisible(!visible);
    setVisibleInputLink(!visibleInputLink);
  };

  const onPressSendLink = () => {
    if (inputLink !== "") {
      setVisibleInputLink(!visibleInputLink);
      navigation.navigate("online-book-reader", { link: inputLink });
    }
  };

  return (
    <>
      <TouchableWithoutFeedback
        onPress={toggleOverlay}
        // onPress={props.addBook}
      >
        <View style={styles.view}>
          <Icon name="plus" type="feather" color="white" size={28} />
        </View>
      </TouchableWithoutFeedback>
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        animationType={"fade"}
      >
        <Button
          title="Open book via link"
          onPress={toggleInputLinkOverlay}
          type="clear"
        />
        <Button title="Open new files" onPress={props.addBook} type="clear" />
      </Overlay>
      <Overlay
        isVisible={visibleInputLink}
        onBackdropPress={toggleInputLinkOverlay}
        animationType={"fade"}
        overlayStyle={{
          width: DIMENSIONS.FULL_WIDTH - 30,
          height: 150,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Input
            label="Link"
            placeholder="BASIC INPUT"
            onChangeText={onChangeInput}
            value={inputLink}
          />
          <Button
            title="Continue"
            containerStyle={{ width: 100 }}
            type="clear"
            onPress={onPressSendLink}
          />
        </View>
      </Overlay>
    </>
  );
}

export default connect(
  null,
  actions
)(AddButton);

const styles = {
  view: {
    backgroundColor: primaryColor,
    position: "absolute",
    bottom: 20,
    right: 20,
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  icon: {
    name: "plus",
    type: "feather",
    color: "white",
    size: 28,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
};
