import React from 'react';
import { connect } from 'react-redux';
import useSWR from 'swr';
import axios from 'axios';
import { ActivityIndicator } from 'react-native';
import { Overlay, Button } from 'react-native-elements';
import request, { BookApi } from 'src/api';
import { updateRecentOnlineChapter } from 'src/actions/recentBooks';
import { useState } from 'react';

function useCancellableSWR(key, swrOptions) {
  const source = axios.CancelToken.source();
  return [
    useSWR(
      key,
      url =>
        request({
          ...BookApi.getChapterContent(url),
          cancelToken: source.token,
        }).then(res => res.data),
      {
        dedupingInterval: 24 * 3600000,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        ...swrOptions,
      },
    ),
    source,
  ];
}

const LoadingForChapter = props => {
  if (!props.show) return null;
  const { url, handleSuccess, handleError, handleCancel } = props;
  const [{ data, error, isValidating }, controller] = useCancellableSWR(url);

  if (isValidating && !data) {
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

  if (data) {
    props.updateRecentOnlineChapter(url);
    handleSuccess(data);
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
    updateRecentOnlineChapter: data =>
      dispatch(updateRecentOnlineChapter(data)),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(LoadingForChapter);

const styles = {
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10',
  },
};
