import React from 'react';
import { Text, View } from 'react-native';

import styles from './styles';
import MainHeader from 'src/components/shared/MainHeader';
import ToolBar from './ToolBar.component';
import BooksGridList from './BooksGridList.component';

export default function LibraryScreen() {
  return (
    <View style={styles.container}>
      <MainHeader />
      <ToolBar />
      <BooksGridList />
    </View>
  );
}
