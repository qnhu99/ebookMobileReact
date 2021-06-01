import React from 'react';
import { Text, ScrollView, View } from 'react-native';

import { Button, Icon } from 'react-native-elements';

const Controller = props => {
  return (
    <View style={styles.controller}>
      <Button
        title="Prev"
        type="clear"
        icon={<Icon name="arrow-left" size={30} color="black" />}
        iconLeft
      />
      <Text style={{ paddingVertical: 12, fontSize: 16 }}>Chapter 1</Text>
      <Button
        title="Next"
        type="clear"
        icon={<Icon name="arrow-right" size={30} color="black" />}
        iconRight
      />
    </View>
  );
};

export default function ChapterContent(props) {
  const { data } = props;
  const { content } = data;
  const settings = props?.settings || {
    backgroundColor: 'white',
    lineHeight: 30,
    fontSize: 20,
  };
  return (
    <View
      style={[styles.wrapper, { backgroundColor: settings?.backgroundColor }]}
    >
      <ScrollView>
        <View style={[styles.container, {}]}>
          <Text
            style={[
              styles.text,
              {
                fontSize: settings?.fontSize,
                lineHeight: settings?.lineHeight,
              },
            ]}
          >
            {content}
          </Text>
        </View>
      </ScrollView>
      <Controller />
    </View>
  );
}

const styles = {
  wrapper: { flex: 1 },
  container: { padding: 30 },
  text: { textAlign: 'justify', fontSize: 20, lineHeight: 30 },
  controller: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 50,
    paddingHorizontal: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 0.75,
    borderTopColor: 'grey',
    elevation: 5,
    backgroundColor: 'white',
  },
};
