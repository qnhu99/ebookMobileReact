import React from 'react';
import { View, Dimensions, Text, ScrollView, FlatList, SafeAreaView } from 'react-native';
import styled from 'styled-components';
import Markdown from 'react-native-markdown-display';

const WrapperView = styled(View)`
  background-color: white;
  padding: 10px;
  flex: 1;
  display: flex;
`;

const content = `
# Welcome to READER+

### A place for people who loves reading online novels. We support a better UI for reading online novels and ton of customizations.

### Promising a much better reading experience for all user.

### Currently, we provide reader view for these sites below:
* Tàng Thư Viện - [https://truyen.tangthuvien.vn](https://truyen.tangthuvien.vn/)
* Trùm Truyên - [https://trumtruyen.net](https://trumtruyen.net/)
* IZ Truyện - [https://iztruyen.com](https://iztruyen.com/)
*more sites will be supported in the future.*

### We also support viewing common document and ebook files:
* .epub
* .pdf

### Our app look like:

![](https://i.imgur.com/clcUq9X.png)

### You can remove or share book from library by a long press on book.

### And reader screen:

![](https://i.imgur.com/yguOKDc.png)

### Menu on reader screen:

![](https://i.imgur.com/hMF2xHp.png)

### Thank you very much for choosing our app.

### 🤗🤗🤗🤗🤗🤗

### If you have any issue, please contact us: [readerplus@gmail.com](mailto:readerplus@gmail.com)
`;

function HelpScreen(props) {
  return (
    <WrapperView>
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{ height: '100%' }}
        >
          <Markdown style={{
            heading1: {
              marginBottom: 10,
            },
            heading3: {
              marginBottom: 7,
            },
            heading4: {
              marginBottom: 4,
            },
            body: {
              fontSize: 17,
            },
            link: {
              color: 'blue'
            }
          }}>
            {content}
          </Markdown>
        </ScrollView>
      </SafeAreaView>
    </WrapperView>

  );
}

export default HelpScreen;
