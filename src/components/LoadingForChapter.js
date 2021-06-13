import React from 'react';
import useSWR from 'swr';
import { ActivityIndicator } from 'react-native';
import { Overlay, Button } from 'react-native-elements';
import request, { BookApi } from 'src/api';
import axios from 'axios';

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
        refreshInterval: 1000,
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

  if (data) handleSuccess(data);
  if (error) {
    if (error.message === 'Cancel-Request') {
      handleCancel();
    } else {
      console.log(typeof error);
      handleError(error);
    }
  }
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
  return null;
};

export default LoadingForChapter;

const styles = {
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10',
  },
};
