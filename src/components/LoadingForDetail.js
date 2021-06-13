import React, { useEffect } from 'react';
import useSWR from 'swr';
import { ActivityIndicator } from 'react-native';
import { Overlay, Button } from 'react-native-elements';
import request, { BookApi } from 'src/api';
import axios from 'axios';
import { connect } from 'react-redux';
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
        refreshInterval: 3000,
        ...swrOptions,
      },
    ),
    source,
  ];
}

const LoadingForDetail = props => {
  if (!props.show) return null;
  const { url, handleSuccess, handleError, handleCancel } = props;
  const [{ data, error, isValidating }, controller] = useCancellableSWR(url);
  if (isValidating) {
    return (
      <Overlay isVisible={props.show} style={styles.wrapper}>
        <ActivityIndicator />
        <Button
          title="Cancel"
          type="clear"
          onPress={() => controller.cancel('Cancel-Request')}
        />
      </Overlay>
    );
  }
  if (data) {
    const currentBook = {
      bookUrl: url,
      chapterLinksArray: data.chapter_link,
      bookInfo: formatBookInfo(data),
      tableOfContent: formatTableOfContent(data),
    };
    props.updateRecentOnlineBooks(currentBook);
    handleSuccess(currentBook);
  }
  if (error) {
    if (error.message === 'Cancel-Request') {
      handleCancel();
    } else {
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
