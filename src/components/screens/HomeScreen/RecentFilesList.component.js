import React from 'react';
import { Text, View, FlatList } from 'react-native';

import styles from './styles.js';
import FilesData from 'src/test/files';

const FileItem = (props) => (
  <View style={styles.fileItem}>
    <Text style={{ fontSize: 16, marginHorizontal: 2 }}> {props.title}</Text>
  </View>
);

export default function RecentFilesList(props) {
  const renderFileItem = ({ item }) => <FileItem title={item.title} />;
  return (
    <>
      <FlatList
        data={FilesData}
        renderItem={renderFileItem}
        keyExtractor={(_, index) => index.toString()}
        {...props}
      />
    </>
  );
}
