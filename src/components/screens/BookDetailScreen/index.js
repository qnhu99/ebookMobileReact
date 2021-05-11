import React, { useState } from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Pdf from './pdf/pdf.js';
import EpubOnline from './epub/epubOnline/epub.js'
import EpubOffline from './epub/epubOffline/epub.js'

async function pickFile(uri) {
      try {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.allFiles],
        });
        console.log(
          res.uri,
        );
        setSource(res.uri)
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
        } else {
          throw err;
        }
      }
  }
export default function BookDetailScreen() {
 
  const [source, setSource] = useState();
  
  // PDF
  // //link pdf online
  // //const [source, setSource] = useState("http://samples.leanpub.com/thereactnativebook-sample.pdf");
  // return (
  //   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //   {/* pick file  tu dien thoai */}
  //     <Button title="pick" onPress={pickFile}/>
  //     <Pdf source={source} />
  //   </View>
  // );

  // //Epub online
  // return (
  //   <EpubOnline />
    
  // );

  //Epub offline
  return (
    <EpubOffline />
  );
}
