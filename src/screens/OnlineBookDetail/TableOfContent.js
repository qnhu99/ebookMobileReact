import React from 'react';
import { View, Text } from 'react-native';
import { Card, ListItem } from 'react-native-elements';

function TableOfContent(props) {
  const { seasons } = props.data;
  return (
    <Card>
      <Card.Title>Table of content</Card.Title>
      <Card.Divider />
      {seasons.map((season, index_season) => {
        return (
          <View key={index_season} style={styles.seasonTitle.container}>
            {<Text style={styles.seasonTitle.text}>{season.season_name}</Text>}
            {season.chapters.map((chapter, index_chapter) => (
              <ListItem
                key={index_chapter}
                onPress={() => props.redirectToReader(chapter)}
                bottomDivider
              >
                <ListItem.Content>
                  <ListItem.Title numberOfLines={1}>
                    {chapter.chapter_name}
                  </ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))}
          </View>
        );
      })}
    </Card>
  );
}

export default TableOfContent;

const styles = {
  seasonTitle: {
    text: {
      fontWeight: 'bold',
      fontSize: 14,
      textAlign: 'center',
    },
    container: {
      marginTop: 15,
      marginBottom: 10,
    },
  },
  chapter: {
    container: {},
  },
};
