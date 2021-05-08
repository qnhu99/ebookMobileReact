import React, { useState } from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import Pdf from './pdf/pdf.js';


export default function BookDetailScreen() {
  const [source, setSource] = useState("http://samples.leanpub.com/thereactnativebook-sample.pdf");
  const [size, setSize] = useState(1);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [isHorizontal, setIsHorizontal] = useState(false);
  const [text, setText] = useState("");

  function onChangeText(how) {
    console.log(">> ~ file: index.js ~ line 15 ~ onChangeText ~ how", how)
    setText(how);
  }

  function setPageFunc(page) {
    setText(page);
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ display: 'flex', flexDirection: 'row'}}>
        <TextInput
          onChangeText={onChangeText}
          value={text}
          keyboardType="numeric"
          placeholder="Page number"
          onSubmitEditing={() => {
            console.log("Next");
            setPage(text);
          }}/>
        
        <Button title="hor"/>
      </View>
      
      {/* <Button title="buton"/> */}
      <Pdf
        source={source}
        size={size}
        totalPage={totalPage}
        isHorizontal={isHorizontal}
        setTotalPage={setTotalPage}
        page={page}
        setPageFunc={setPageFunc}
      />
    </View>
    // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //   <Text>BookDetailScreen</Text>
    // </View>
  );
}
