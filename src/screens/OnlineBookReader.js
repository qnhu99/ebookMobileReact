import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import axios, { BookApi } from 'src/api';
import Loading from '../components/Loading';
import ChapterContent from '../components/ChapterContent';
import Icons from '../res/icons';

function OnlineBookReader(props) {
  const navigation = useNavigation();
  const link = props.route.params.data;
  const [data, setData] = useState(null);
  useEffect(() => {
    let mounted = true;
    axios(BookApi.getChapterContent(link)).then(response => {
      if (mounted) {
        setData(response.data);
      }
    });
    return function cleanup() {
      mounted = false;
    };
  }, [data]);

  if (!data) {
    navigation.setOptions({
      headerShown: false,
      headerRight: () => (
        <View style={styles.iconWrapper}>
          <Icons.menu
            size={20}
            style={styles.headerIcon}
            onPress={() => console.log('press')}
          />
        </View>
      ),
    });
    return <Loading loading={true} />;
  }

  navigation.setOptions({ headerShown: true, title: data.chapter_title });

  return <ChapterContent content={data.content} />;
}

export default OnlineBookReader;

const styles = {
  wholeScreen: { flex: 1 },
  headerIcon: { padding: 5 },
  iconWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 100,
  },
};
