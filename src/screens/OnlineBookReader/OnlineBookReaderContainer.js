import React from 'react';
import useSWR from 'swr';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import ChapterContent from './ChapterContent';
import Icons from '../../res/icons';
import Loading from '../../components/Loading';

function OnlineBookReaderContainer(props) {
  const navigation = useNavigation();
  const link = props.route.params.data;
  const { data } = useSWR(link);
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

  if (!data) {
    navigation.setOptions({ headerShown: false });
    return <Loading loading={true} />;
  }

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

  return <ChapterContent content={data.content} />;
}

export default OnlineBookReaderContainer;

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
