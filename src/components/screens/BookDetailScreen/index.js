import React, { useState } from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import Pdf from './pdf/pdf.js';
import Epub from './epub/epubOnline/epub.js'


export default function BookDetailScreen() {
  const [source, setSource] = useState("http://samples.leanpub.com/thereactnativebook-sample.pdf");

  return (
    <Epub />
    // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //   {/* <Pdf source={source} /> */}
    //   <Epub />

    // </View>
    // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //   <Text>BookDetailScreen</Text>
    // </View>
  );
}
