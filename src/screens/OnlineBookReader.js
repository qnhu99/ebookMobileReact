import React from 'react';
import useSWR from 'swr';
import { Alert, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import ChapterContent from '../components/ChapterContent';
import Icons from '../res/icons';
import Loading from '../components/Loading';
import axios, { BookApi } from 'src/api';

function OnlineBookReader(props) {
  const navigation = useNavigation();
  const { chapter, tableOfContent } = props.route.params;
  // console.log(JSON.stringify(chapter, null, 4));
  const { chapter_link: link } = chapter;
  // console.log(link);
  const { data, error } = useSWR(link, url =>
    axios(BookApi.getChapterContent(url)).then(res => res.data),
  );
  // const [data, setData] = useState(null);
  // useEffect(() => {
  //   let mounted = true;
  //   axios(BookApi.getChapterContent(link)).then(response => {
  //     if (mounted) {
  //       setData(response.data);
  //     }
  //   });
  //   return function cleanup() {
  //     mounted = false;
  //   };
  // }, [data]);

  if (error) {
    navigation.setOptions({ title: 'Error', headerShown: true });
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          Something went wrong...
        </Text>
        <Text style={{ fontSize: 16 }}>{error.message}</Text>
      </View>
    );
  }

  if (!data) {
    navigation.setOptions({ headerShown: false });
    return <Loading loading={true} />;
  } else {
    navigation.setOptions({
      headerShown: true,
      title: data.chapter_title,
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
    return <ChapterContent data={{ ...chapter, ...data }} />;
  }
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
