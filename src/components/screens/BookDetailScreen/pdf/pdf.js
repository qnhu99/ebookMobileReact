import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';

import Pdf from 'react-native-pdf';

let thisPdf = null;

export default function PDFExample(props) {
    console.log(props);
    const source = { uri: props.source, cache:true };

    if (thisPdf) {
        console.log("thisPdf.setPage(parseInt(props.page));");
        // error handling
        thisPdf.setPage(parseInt(props.page));
    }
    // const source = {uri:'http://samples.leanpub.com/thereactnativebook-sample.pdf',cache:true};
    //const source = require('./test.pdf');  // ios only
    //const source = {uri:'bundle-assets://test.pdf'};

    //const source = {uri:'file:///sdcard/test.pdf'};
    //const source = {uri:"data:application/pdf;base64,JVBERi0xLjcKJc..."};

    return (
        <Pdf
            ref={(pdf) => { thisPdf = pdf; }}
            source={source}
            horizontal={props.isHorizontal}
            onLoadComplete={(numberOfPages,filePath) => {
                console.log(`number of pages: ${numberOfPages}`);
                props.setTotalPage(numberOfPages);
            }}
            onPageChanged={(page,numberOfPages) => {
                console.log(`current page: ${page}`);
                // props.setPageFunc(page);
            }}
            onError={(error) => {
                console.log(error);
            }}
            onPressLink={(uri) => {
                console.log(`Link presse: ${uri}`)
            }}
            style={styles.pdf}/>
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