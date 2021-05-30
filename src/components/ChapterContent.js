import React from 'react';
import { View, Text, ScrollView } from 'react-native';

export default function ChapterContent(props) {
  return (
    <ScrollView>
      <Text>{props.content}</Text>
    </ScrollView>
  );
}
