import React from 'react';
import { View, Text, TouchableOpacity, SectionList } from 'react-native';
import { useNavigation } from '@react-navigation/core';

const Chapter = ({ item, disabled, setDrawer }) => {
  const navigation = useNavigation();
  const redirectToReader = chapter => {
    setDrawer(false);
    navigation.navigate('online-book-reader', {
      link: chapter.chapter_link,
    });
  };
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
        onPress={() => redirectToReader(item)}
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
  const { tableOfContent, currentChapterLink, setDrawer } = props;

  const formatData = () => {
    return tableOfContent.seasons.map(season => ({
      title: season.season_name,
      data: season.chapters,
    }));
  };
  const renderItem = ({ item }) => (
    <Chapter
      setDrawer={setDrawer}
      item={item}
      disabled={item.chapter_link === currentChapterLink}
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
