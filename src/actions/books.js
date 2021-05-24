import {
  getStoragePermission,
  checkStoragePermissions,
} from '../utils/permissions';
import showToast from "../components/Toast";
//import DocumentPicker from 'react-native-document-picker';
import RNFileSelector from 'react-native-file-selector';

export const addBook = ({ navigation, fileUrl }) => async (dispatch) => {
  let granted = await checkStoragePermissions();
  if (!granted) await getStoragePermission();

  const _addBook = url => {
    let components = url.split("/");
    let file = components[components.length - 1].split(".");
    let title = file[0]
    let type = file[file.length - 1].toLowerCase()
    dispatch({
      type: "add_books",
      payload: { title, url, type },
    });
    navigation.navigate(`${type || 'epub' || 'pdf'}-reader`, { title, url, index: 0, });
  }

  if (fileUrl === undefined) {

    RNFileSelector.Show({
      title: "Select ebook file",
      filter: ".*\\.(epub|EPUB|pdf|PDF)$",

      onDone: (url) => {
        _addBook(url);
      },
      onCancel: () => {
        showToast("Cancel open book");
      },
    });
  } else {
    _addBook(fileUrl);
  }
};

// function transformLink(link) {
//   return link.replace(/raw%3A/g, '').replace(/%2F/g, '/');
// }

// export const addBook = ({ navigation }) => async dispatch => {
//   let granted = await checkStoragePermissions();
//   if (!granted) await getStoragePermission();
//   try {
//     let res = await DocumentPicker.pick({
//       type: [DocumentPicker.types.allFiles],
//     });
//     let components = res.uri.split('/');
//     res.uri = components[components.length - 1];
//     let url = transformLink(res.uri);
//     let filetype = res.name.split('.');
//     let type = filetype[1].toLowerCase();
//     let title = res.name;
//     dispatch({
//       type: 'add_books',
//       payload: {
//         title,
//         url,
//         type,
//       },
//     });

//     navigation.navigate(`${type || 'epub' || 'pdf'}-reader`, {
//       title,
//       url,
//       index: 0,
//     });
//   } catch (err) {
//     if (DocumentPicker.isCancel(err)) {
//       // User cancelled the picker, exit any dialogs or menus and move on
//     } else {
//       throw err;
//     }
//   }
// };

export const addMetadata = (data, index) => {
  return { type: 'add_metadata', payload: { data, index } };
};

export const removeBook = index => {
  return { type: 'remove_book', payload: index };
};

export const sortBook = index => {
  return { type: 'sort_book', payload: index };
};
