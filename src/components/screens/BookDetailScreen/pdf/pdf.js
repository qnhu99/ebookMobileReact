import React, { useState } from 'react';
import { StyleSheet, Dimensions, View, Text, TextInput, Button } from 'react-native';

import Pdf from 'react-native-pdf';

let thisPdf = null;

export default function PDFExample(props) {
  console.log(props);

  const source = { uri: props.source, cache: true };

  const [currentPage, setCurrentPage] = useState(1);

  const [size, setSize] = useState(1);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [isHorizontal, setIsHorizontal] = useState(false);
  const [text, setText] = useState("");
  // const source = {uri:'http://samples.leanpub.com/thereactnativebook-sample.pdf',cache:true};
  //const source = require('./test.pdf');  // ios only
  //const source = {uri:'bundle-assets://test.pdf'};

  //const source = {uri:'file:///sdcard/test.pdf'};
  //const source = {uri:"data:application/pdf;base64,JVBERi0xLjcKJc..."};

  console.log({text});

  return (
    <View style={styles.pdf}>
      <View style={{ display: 'flex', flexDirection: 'row'}}>
        <TextInput
          onChangeText={setText}
          value={text}
          keyboardType="numeric"
          placeholder="Go to page"
          onSubmitEditing={() => {
            thisPdf.setPage(parseInt(text));
          }}
        />
        <Button style={{height: 10 }} title={ `Switch to ${isHorizontal ? "vertical" : "horizontal"}` } onPress={() => {
          setIsHorizontal(prev => !prev);
        }}/>
        <Text>{`Current page: ${currentPage}`}</Text>
      </View>
      <Pdf
        ref={(pdf) => { thisPdf = pdf; }}
        source={source}
        horizontal={isHorizontal}
        onLoadComplete={(numberOfPages,filePath) => {
            console.log(`number of pages: ${numberOfPages}`);
            setTotalPage("" + numberOfPages);
        }}
        onPageChanged={(page,numberOfPages) => {
            console.log(`current page: ${page}`);
            // setCurrentPage(page);
            setText(String(page));
        }}
        onError={(error) => {
            console.log(error);
        }}
        onPressLink={(uri) => {
            console.log(`Link pressed: ${uri}`)
        }}
        style={styles.pdf}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex:1,
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
  }
});