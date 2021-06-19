import React, { useEffect } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { ActivityIndicator } from 'react-native';
import { Overlay, Button } from 'react-native-elements';
import request, { BookApi } from 'src/api';
import { updateRecentOnlineChapter } from 'src/actions/recentBooks';
import { connect } from 'react-redux';
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
        refreshInterval: 3000,
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

  if (isValidating) {
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
