import React, { useState, useLayoutEffect, useEffect } from "react";
import { View, Text, FlatList, StatusBar } from "react-native";

function OnlineBookReader(props) {
  const link = props.route.params.link;
  console.log(link);
  return (
    <View>
      <Text>Hello {link}</Text>
    </View>
  );
}

export default OnlineBookReader;
