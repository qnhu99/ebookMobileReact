import {
  getStoragePermission,
  checkStoragePermissions,
} from '../utils/permissions';
import showToast from '../components/Toast';
//import DocumentPicker from 'react-native-document-picker';
// import RNFileSelector from 'react-native-file-selector';

export const addBook = ({ navigation, fileUrl }) => async dispatch => {
  let granted = await checkStoragePermissions();
  if (!granted) await getStoragePermission();

  const _addBook = url => {
    let components = url.split('/');
    let file = components[components.length - 1].split('.');
    let title = file[0];
    let type = file[file.length - 1].toLowerCase();
    dispatch({
      type: 'add_books',
      payload: { title, url, type },
    });
    navigation.navigate(`${type || 'epub' || 'pdf'}-reader`, {
      title,
      url,
      index: 0,
    });
  };

  if (fileUrl === undefined) {
    // RNFileSelector.Show({
    //   title: "Select ebook file",
    //   filter: ".*\\.(epub|EPUB|pdf|PDF)$",
    //   onDone: (url) => {
    //     _addBook(url);
    //   },
    //   onCancel: () => {
    //     showToast("Cancel open book");
    //   },
    // });
  } else {
    _addBook(fileUrl);
  }
};

export const addMetadata = (data, index) => {
  return { type: 'add_metadata', payload: { data, index } };
};

export const removeBook = index => {
  return { type: 'remove_book', payload: index };
};

export const sortBook = index => {
  return { type: 'sort_book', payload: index };
};
