import React, { useEffect } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { updateRecentOnlineBooks } from 'src/actions/recentBooks';
import BookInfo from './BookInfo';
import TableOfContent from './TableOfContent';

const formatBookInfo = data => {
  const {
    img_url: imgUrl,
    book_name: bookName,
    book_intro: bookIntro,
    book_author: bookAuthor,
  } = data;
  return {
    imgUrl,
    bookName,
    bookIntro,
    bookAuthor: bookAuthor.replace('\n', ''),
  };
};
const formatTableOfContent = data => {
  const { chapter_name, chapter_link, season_name, season_index } = data;
  const chaptersFormatted = chapter_name.map((chap, i) => {
    return {
      chapter_index: i,
      chapter_name: chap,
      chapter_link: chapter_link[i],
    };
  });
  return {
    seasons: season_name.map((season, i) => {
      return {
        season_index: i,
        season_name: season,
        chapters: chaptersFormatted
          .slice(season_index[i], season_index[i + 1])
          .map(chap => ({ ...chap, season_index, season_name })),
      };
    }),
  };
};

function OnlineBookDetail(props) {
  const navigation = useNavigation();
  const data = props.route.params.data;
  const bookInfo = formatBookInfo(data);
  const tableOfContent = formatTableOfContent(data);
  useEffect(() => {
    console.log(typeof data);
    // const currentBook = {
    //   bookUrl: data.book_url,
    //   bookName: bookInfo.bookName,
    //   bookAuthor: bookInfo.bookAuthor,
    //   imgUrl: bookInfo.imgUrl,
    //   tableOfContent,
    //   chapterLinksArray: data.chapter_link,
    // };
    // props.updateRecentOnlineBooks(currentBook);
  });
  navigation.setOptions({ title: data.book_name, headerShown: true });

  return (
    <ScrollView>
      <View>
        <Text>Testing...</Text>
        {/* <BookInfo data={bookInfo} /> */}
        {/* <TableOfContent data={tableOfContent} /> */}
      </View>
    </ScrollView>
  );

  // const navigation = useNavigation();
  // const link = props.route.params.link;
  // const [{ data, error }, controller] = useCancellableSWR(link);

  // useEffect(() => {
  //   if (data) console.log(JSON.stringify(data, null, 2));
  // });

  // if (error) {
  //   const message = error.message;
  //   navigation.setOptions({ title: 'Error', headerShown: true });
  //   return <Error message={message} />;
  // }

  // if (data) {
  //   if (data?.message) {
  //     const message = data.message;
  //     navigation.setOptions({ title: 'Error', headerShown: true });
  //     return <Error message={message} />;
  //   }
  //   const tableOfContent = formatTableOfContent(data);
  //   const currentBook = {
  //     bookUrl: link,
  //     bookName: data.book_name,
  //     bookAuthor: data.book_author.replace('\n', ''),
  //     imgUrl: data.img_url,
  //     tableOfContent,
  //     chapterLinksArray: data.chapter_link,
  //   };
  //   props.updateRecentOnlineBooks(currentBook);
  //   navigation.setOptions({ title: data.book_name, headerShown: true });
  //   const redirectToReader = chapter => {
  //     navigation.navigate('online-book-reader', { link: chapter.chapter_link });
  //   };

  //   return (
  //     <ScrollView>
  //       <View>
  //         <BookInfo data={formatBookInfo(data)} />
  //         <TableOfContent
  //           data={tableOfContent}
  //           redirectToReader={redirectToReader}
  //         />
  //       </View>
  //     </ScrollView>
  //   );
  // } else {
  //   navigation.setOptions({ headerShown: false });
  //   return (
  //     <Loading
  //       handleCancel={() => {
  //         controller.cancel('Cancel-Request');
  //       }}
  //     />
  //   );
  // }
}

const mapDispatchToProps = dispatch => {
  return {
    updateRecentOnlineBooks: data => dispatch(updateRecentOnlineBooks(data)),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(OnlineBookDetail);
