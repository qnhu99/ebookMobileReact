import React from 'react';
import useSWR from 'swr';
import { useNavigation } from '@react-navigation/native';
import { Alert, ActivityIndicator } from 'react-native';
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
          ...BookApi.getBookDetail(url),
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

const LoadingForDetail = props => {
  if (!props.show) return null;
  const { url, handleSuccess, handleError, handleCancel } = props;
  const [{ data, error, isValidating, mutate }, controller] = useCancellableSWR(
    url,
  );
  // console.log(
  //   'Before mutate',
  //   JSON.stringify({ _data: typeof data, error: typeof error, isValidating }),
  // );
  // if (error && error?.message === 'Cancel-Request' && isValidating) mutate(url);
  // console.log(
  //   'After mutate',
  //   JSON.stringify({ _data: typeof data, error, isValidating }),
  // );

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
  if (data) handleSuccess({ ...data, book_url: url });
  if (error) {
    if (error.message === 'Cancel-Request') {
      // mutate(url, null, true);
      handleCancel();
    } else {
      console.log(typeof error);
      handleError(error);
    }
  }

  return null;
};

export default LoadingForDetail;

const styles = {
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10',
  },
};
