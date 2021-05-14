import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { STRINGS, ICONS } from 'src/res';

import styles from './styles';

export default function ToolBar() {
  // 1: ASC, 0: DESC
  const [titleOrderAscending, setTitleOrder] = useState(true);
  const [dateAddedAscending, setDateAddedOrder] = useState(true);
  const [lastViewAscending, setLastViewOrder] = useState(true);
  // For highlight
  const [sortBy, setSortBy] = useState('date added');

  const onPressTitleSortIcon = () => {
    if (sortBy === 'title') {
      setTitleOrder(!titleOrderAscending);
    } else {
      setSortBy('title');
    }
  };
  const onPressDateAddedSortIcon = () => {
    if (sortBy === 'date added') {
      setDateAddedOrder(!dateAddedAscending);
    } else {
      setSortBy('date added');
    }
  };
  const onPressLastViewSortIcon = () => {
    if (sortBy === 'last view') {
      setLastViewOrder(!lastViewAscending);
    } else {
      setSortBy('last view');
    }
  };

  return (
    <View style={styles.toolbar}>
      <View
        style={{
          flex: 2,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignContent: 'center',
        }}>
        <Button
          title="Title"
          type={sortBy === 'title' ? 'solid' : 'clear'}
          onPress={onPressTitleSortIcon}
          icon={
            titleOrderAscending ? (
              <ICONS.SORT_ALPHABETICAL_ASCENDING />
            ) : (
              <ICONS.SORT_ALPHABETICAL_DESCENDING />
            )
          }
        />
        <Button
          title="Date added"
          type={sortBy === 'date added' ? 'solid' : 'clear'}
          onPress={onPressDateAddedSortIcon}
          icon={() =>
            dateAddedAscending ? (
              <ICONS.SORT_ASCENDING />
            ) : (
              <ICONS.SORT_DESCENDING />
            )
          }
        />
        <Button
          title="Last view"
          type={sortBy === 'last view' ? 'solid' : 'clear'}
          onPress={onPressLastViewSortIcon}
          icon={() =>
            lastViewAscending ? (
              <ICONS.SORT_ASCENDING />
            ) : (
              <ICONS.SORT_DESCENDING />
            )
          }
        />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              marginHorizontal: 10,
              alignSelf: 'center',
            }}>
            <ICONS.FILTER onPress={() => console.log('Press filter')} />
          </View>
        </View>
      </View>
    </View>
  );
}
