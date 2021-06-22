import React from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import { Overlay, Button } from 'react-native-elements';
import request, { BookApi } from 'src/api';
import { updateRecentOnlineBooks } from 'src/actions/recentBooks';

const formatBookInfo = data => {
  const {
    img_url: imgUrl,
    book_name: bookName,
    book_intro: bookIntro,
    book_author: bookAuthor,
  } = data;
  return {
    imgUrl,
    bookName: bookName.trim(),
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
          .map(chap => chap),
      };
    }),
  };
};

function useCancellableSWR(key, swrOptions) {
  const source = axios.CancelToken.source();
  return [
    useSWR(
      key,
      url =>
        request({
          ...BookApi.getBookDetail(url),
          cancelToken: source.token,
        }).then(res => res.data),
      {
        dedupingInterval: 1000,
        refreshInterval: 1000,
        ...swrOptions,
      },
    ),
    source,
  ];
}

function validURL(str) {
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // fragment locator
  return !!pattern.test(str);
}

const LoadingForDetail = props => {
  if (!props.show) return null;
  if (!validURL(props.url)) {
    props.handleError({ message: 'Input invalid' });
    return null;
  }
  const { url, handleSuccess, handleError, handleCancel } = props;

  const [{ data, error, isValidating }, controller] = useCancellableSWR(url);

  if (isValidating && !data?.book_name) {
    return (
      <Overlay isVisible={props.show} style={styles.wrapper}>
        <ActivityIndicator size="large" />
        <Button
          title="Cancel"
          type="clear"
          onPress={() => {
            handleCancel();
            controller.cancel('Cancel-Request');
          }}
        />
      </Overlay>
    );
  }
  if (data?.book_name) {
    const currentBook = {
      bookUrl: url,
      chapterLinksArray: data.chapter_link,
      bookInfo: formatBookInfo(data),
      tableOfContent: formatTableOfContent(data),
    };
    props.updateRecentOnlineBooks(currentBook);
    handleSuccess(currentBook);
  } else {
    handleError({ message: 'Something went wrong...' });
  }

  if (error) {
    if (error.message !== 'Cancel-Request') {
      handleError(error);
    }
  }

  return null;
};
const mapDispatchToProps = dispatch => {
  return {
    updateRecentOnlineBooks: data => dispatch(updateRecentOnlineBooks(data)),
  };
};
export default connect(
  null,
  mapDispatchToProps,
)(LoadingForDetail);

const styles = {
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10',
  },
};
