import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { View } from 'react-native';
import StaticServer from 'react-native-static-server';
import { ExternalStorageDirectoryPath } from 'react-native-fs';
import { WebView } from 'react-native-webview';
import SideMenu from 'react-native-side-menu';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Drawer from '../components/Drawer';
import showToast from '../components/Toast';
import Spinner from '../components/Spinner';
import Footer from '../components/Footer';
import Icon from '../components/Icon';

const serverConfig = { localOnly: true, keepAlive: true };

function PdfReader(props) {
  const [state, setState] = useState({ docUrl: null, server: null });
  const [isDrawer, setDrawer] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const webview = useRef();
  const { params } = props.route;
  const { progress, totalPages, bookmarks } = props.books[params.index];

  const onBookmarkPress = () => {
    props.addMetadata({
      bookmarks: [...bookmarks, {
        text: `Page: ${progress}`,
        location: progress,
      }]
    }, params.index);
    showToast("This page bookmarked");
  }

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <View style={styles.iconWrapper}>
          <Icon
            name="bookmark-plus-outline"
            size={21}
            color={props.settings.fg}
            style={styles.headerIcon}
            type="community"
            onPress={onBookmarkPress}
          />
          <Icon
            name="menu"
            size={20}
            color={props.settings.fg}
            style={styles.headerIcon}
            onPress={() => setDrawer(!isDrawer)}
          />
        </View>
      )
    });
  }, [props.navigation, isDrawer, selectedText, progress, bookmarks]);

  useEffect(() => {
    showToast('Opening book');
    let newServer = new StaticServer(0, ExternalStorageDirectoryPath, serverConfig);
    newServer.start().then((url) =>
      setState({
        docUrl: url + params.url.replace(ExternalStorageDirectoryPath, ''),
        server: newServer
      })
    );
    return () => {
      props.sortBook(params.index);
      state.server && state.server.stop();
    };
  }, []);



  let injectedJS = `window.DOC_PATH = "${state.docUrl}";`;

  if (progress) {
    injectedJS = `${injectedJS}
		window.pageNum = ${progress};
		`;
  }

  function goPrev() {
    webview.current?.injectJavaScript(`
		if (window.pageNum > 1) {
			window.pageNum--;
			window.queueRenderPage(window.pageNum);
		}`);
  }

  function goNext() {
    webview.current?.injectJavaScript(`
		if (window.pageNum < pdfDoc.numPages) {
			window.pageNum++;
			window.queueRenderPage(window.pageNum);
		}`);
  }

  function goToLocation(pageNum) {
    if (pageNum >= 1 && pageNum <= totalPages) {
      props.addMetadata({ progress: pageNum }, params.index);
      webview.current?.injectJavaScript(`
			window.pageNum = ${pageNum};
			window.queueRenderPage(${pageNum});`);
    }
    isDrawer && setDrawer(false);
  }

  function handleMessage(e) {
    let parsedData = JSON.parse(e.nativeEvent.data);
    let { type } = parsedData;
    delete parsedData.type;
    switch (type) {
      case 'selected': {
        setSelectedText(parsedData.selected);
        return;
      }
      case 'loc': {
        return props.addMetadata(parsedData, params.index);
      }
      default:
        return;
    }
  }

  if (!state.docUrl) {
    return <Spinner fg={props.settings.fg} bg={props.settings.bg} />;
  }
  const menu = (
    <Drawer
      index={params.index}
      goToLocation={goToLocation}
      drawerType="pdf"
    />
  );
  return (
    <SideMenu menu={menu} isOpen={isDrawer} menuPosition="right" onChange={setDrawer}>
      <WebView
        ref={webview}
        // style={[styles.wholeScreen, { backgroundColor: props.settings.bg }]}
        style={[styles.wholeScreen]}
        source={{ uri: 'file:///android_asset/pdf.html' }}
        injectedJavaScriptBeforeContentLoaded={injectedJS}
        onMessage={handleMessage}
      />
      <Footer goNext={goNext} goPrev={goPrev} goToLocation={goToLocation} index={params.index} />

    </SideMenu>
  );
}

function mapStateToProps(state) {
  return {
    settings: state.settings,
    books: state.books
  };
}

export default connect(
  mapStateToProps,
  actions
)(PdfReader);

const styles = {
  wholeScreen: { flex: 1 },
  headerIcon: { padding: 5 },
  iconWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 100
  }
};