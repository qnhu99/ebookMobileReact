import {
  getStoragePermission,
  checkStoragePermissions,
} from "../utils/permissions";
// import showToast from "../components/Toast";
import DocumentPicker from "react-native-document-picker";

// export const addBook = () => async (dispatch) => {
//   let granted = await checkStoragePermissions();
//   if (!granted) await getStoragePermission();
//   RNFileSelector.Show({
//     title: "Select epub file",
//     filter: ".*\\.(epub|EPUB|pdf|PDF)$",
//     onDone: (url) => {
//       console.log(url);
//       let components = url.split("/");
//       let file = components[components.length - 1].split(".");
//       console.log(">> ~ file: books.js ~ line 14 ~ addBook ~ file", file);
//       // if (file[file.length - 1] !== 'epub') {
//       // 	return showToast('Invalid file. Only "epub" files are allowed');
//       // }
//       console.log(file[0]);
//       console.log(file[file.length - 1]);
//       console.log(url);
//       dispatch({
//         type: "add_books",
//         payload: {
//           title: file[0],
//           url,
//           type: file[file.length - 1].toLowerCase(),
//         },
//       });
//     },
//     onCancel: () => {},
//   });
// };

function transformLink(link) {
  return link.replace(/raw%3A/g, "").replace(/%2F/g, "/");
}

export const addBook = () => async (dispatch) => {
  let granted = await checkStoragePermissions();
  if (!granted) await getStoragePermission();
  try {
    let res = await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
    });
    let components = res.uri.split("/");
    res.uri = components[components.length - 1];
    let url = transformLink(res.uri);
    let filetype = res.name.split(".");
    dispatch({
      type: "add_books",
      payload: {
        title: res.name,
        url,
        type: filetype[1].toLowerCase(),
      },
    });
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker, exit any dialogs or menus and move on
    } else {
      throw err;
    }
  }
};

export const addMetadata = (data, index) => {
  return { type: "add_metadata", payload: { data, index } };
};

export const removeBook = (index) => {
  return { type: "remove_book", payload: index };
};

export const sortBook = (index) => {
  return { type: "sort_book", payload: index };
};
