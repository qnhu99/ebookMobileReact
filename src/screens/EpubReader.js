import React, { useState, useEffect, useRef } from 'react';
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
import themeToStyles from '../utils/themeToStyles';

const serverConfig = { localOnly: true, keepAlive: true };

function EpubReader(props) {
  const [state, setState] = useState({ bookUrl: null, server: null });
  const [isDrawer, setDrawer] = useState(false);
  const [searchResults, setSearchResults] = useState(null);

  const webview = useRef();
  const { params } = props.route;
  const currentLocation = props.locations[props.books[params.index].key];
  const bookLocations = props.books[params.index].locations;

  useEffect(() => {
    showToast('Opening book');
    let newServer = new StaticServer(
      0,
      ExternalStorageDirectoryPath,
      serverConfig,
    );
    newServer.start().then(url =>
      setState({
        bookUrl: url + params.url.replace(ExternalStorageDirectoryPath, ''),
        server: newServer,
      }),
    );
    //only run when component unmount
    return () => {
      props.sortBook(params.index);
      state.server && state.server.stop();
    };
  }, []);

  let injectedJS = `window.BOOK_PATH = "${state.bookUrl}";
	window.LOCATIONS = ${bookLocations};
	window.THEME = ${JSON.stringify(themeToStyles(props.settings))};
	`;

  if (currentLocation) {
    injectedJS = `${injectedJS}
		window.BOOK_LOCATION = '${currentLocation}';
		`;
  }

  function goPrev() {
    webview.current?.injectJavaScript(`window.rendition.prev()`);
  }

  function goNext() {
    webview.current?.injectJavaScript(`window.rendition.next()`);
  }

  function goToLocation(href) {
    webview.current?.injectJavaScript(`window.rendition.display('${href}')`);
    isDrawer && setDrawer(false);
  }

  function refresh() {
    webview.current?.injectJavaScript(
      `window.BOOK_LOCATION = "${currentLocation}"`,
    );
    webview.current?.reload();
  }

  function onSearch(q) {
    webview.current?.injectJavaScript(`
		Promise.all(
			window.book.spine.spineItems.map((item) => {
				return item.load(window.book.load.bind(window.book)).then(() => {
					let results = item.find('${q}'.trim());
					item.unload();
					return Promise.resolve(results);
				});
			})
		).then((results) =>
			window.ReactNativeWebView.postMessage(
				JSON.stringify({ type: 'search', results: [].concat.apply([], results) })
			)
		)`);
  }

  function handleMessage(e) {
    let parsedData = JSON.parse(e.nativeEvent.data);
    let { type } = parsedData;
    delete parsedData.type;
    switch (type) {
      case 'loc': {
        const { progress, totalPages } = parsedData;
        props.addMetadata({ progress, totalPages }, params.index);
        delete parsedData.progress;
        delete parsedData.totalPages;
        return props.addLocation(parsedData);
      }
      case 'key':
      case 'metadata':
      case 'contents':
      case 'locations':
        return props.addMetadata(parsedData, params.index);
      default:
        return;
    }
  }

  if (!state.bookUrl) {
    return <Spinner fg={props.settings.fg} bg={props.settings.bg} />;
  }
  const menu = (
    <Drawer
      index={params.index}
      goToLocation={goToLocation}
      onSearch={onSearch}
      searchResults={searchResults}
    />
  );
  return (
    <SideMenu>
      <WebView
        ref={webview}
        style={[styles.wholeScreen, { backgroundColor: props.settings.bg }]}
        source={{ uri: 'file:///android_asset/epub.html' }}
        injectedJavaScriptBeforeContentLoaded={injectedJS}
        onMessage={handleMessage}
      />
      <Footer
        goNext={goNext}
        goPrev={goPrev}
        locations={bookLocations}
        goToLocation={goToLocation}
        index={params.index}
      />
    </SideMenu>
  );
}

function mapStateToProps(state) {
  return {
    settings: state.settings,
    books: state.books,
    locations: state.locations,
  };
}

export default connect(
  mapStateToProps,
  actions,
)(EpubReader);

const styles = {
  wholeScreen: { flex: 1 },
  headerIcon: { padding: 5 },
  iconWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 100,
  },
};
