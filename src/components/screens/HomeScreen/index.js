import React from 'react';
import { View, Text } from 'react-native';

import { STRINGS } from 'src/res';

import MainHeader from 'src/components/shared/MainHeader';

import styles from './styles';
import WelcomeIntro from './WelcomeIntro.component.js';
import RecentBooksList from './RecentBooksList.component';
import RecentFilesList from './RecentFilesList.component';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <MainHeader />
      <RecentFilesList
        ListHeaderComponent={
          <>
            <WelcomeIntro />
            <RecentBooksList />
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{STRINGS.RECENT_FILES}</Text>
            </View>
          </>
        }
      />
    </View>
  );
}
