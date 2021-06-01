import React from 'react';
import OnlineBookReaderContainer from './OnlineBookReaderContainer';
import { SWRConfig } from 'swr';
import axios, { BookApi } from '../../api';

export default function OnlineBookReader(props) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher: url =>
          axios(BookApi.getChapterContent(url)).then(res => res.data),
      }}
    >
      <OnlineBookReaderContainer {...props} />
    </SWRConfig>
  );
}
