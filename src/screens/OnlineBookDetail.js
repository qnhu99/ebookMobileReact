import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import BookInfo from '../components/BookInfo';

function OnlineBookDetail({ route, navigation }) {
  const data = route.params.data;
  useEffect(() => {
    navigation.setOptions({
      title: data.book_name,
      headerShown: true,
    });
  }, []);
  return (
    <ScrollView>
      <BookInfo data={data} />
    </ScrollView>
  );
}

export default OnlineBookDetail;
