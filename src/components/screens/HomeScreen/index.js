import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import { STRINGS } from 'src/res';

import MainHeader from 'src/components/shared/MainHeader';

import styles from './styles';
import WelcomeIntro from './WelcomeIntro.component.js';
import RecentBooksList from './RecentBooksList.component';
import RecentFilesList from './RecentFilesList.component';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <MainHeader />
      <WelcomeIntro />
      <RecentBooksList />
      <RecentFilesList />
    </ScrollView>
  );
}
