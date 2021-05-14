import React from 'react';
import { Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';

import styles from './styles.js';
import FilesData from 'src/dummy_data/files';
import { STRINGS } from 'src/res';

export default function RecentFilesList(props) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{STRINGS.RECENT_FILES}</Text>
      <View>
        {FilesData.map((item, index) => (
          <ListItem key={index} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{item.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
    </View>
  );
}
