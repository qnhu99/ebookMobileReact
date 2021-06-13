import React from 'react';
import { View, Text, TouchableOpacity, SectionList } from 'react-native';
import { useNavigation } from '@react-navigation/core';

const Chapter = ({ item, disabled, redirectToReader }) => {
  useNavigation(() => {
    console.log(
      '🚀 ~ file: TableContent.js ~ line 6 ~ Chapter ~ item',
      JSON.stringify(item, null, 2),
    );
  });
  return (
    <View
      style={[
        styles.item,
        disabled ? { backgroundColor: '#fff' } : { backgroundColor: '#d3d3d3' },
      ]}
    >
      <TouchableOpacity
        style={{ paddingVertical: 10 }}
        disabled={disabled}
        onPress={() => redirectToReader(item.chapter_link)}
      >
        <Text style={styles.item_text} numberOfLines={1}>
          {item.chapter_name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const SectionHeader = ({ title }) => <Text style={styles.header}>{title}</Text>;

function TableContent(props) {
  const { tableOfContent, currentChapterLink, handlePressChapter } = props;

  const formatData = () => {
    return tableOfContent.seasons.map(season => ({
      title: season.season_name,
      data: season.chapters,
    }));
  };
  const redirectToReader = url => {
    handlePressChapter(url);
  };
  const renderItem = ({ item }) => (
    <Chapter
      item={item}
      disabled={item.chapter_link === currentChapterLink}
      redirectToReader={redirectToReader}
    />
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <SectionHeader title={title} />
  );
  return (
    <View>
      <SectionList
        sections={formatData()}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
      />
    </View>
  );
}

export default TableContent;

const styles = {
  item: {
    paddingVertical: 5,
    paddingHorizontal: 3,
  },
  item_text: {
    fontSize: 16,
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  title: {
    fontSize: 24,
  },
};
