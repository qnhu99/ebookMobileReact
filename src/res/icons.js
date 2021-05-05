import React from 'react';
import { Icon } from 'react-native-elements';

const ICONS = {
  // Bottom Tab Navigator (Ionicon icon)
  HOME: (props) => <Icon name="home" type="ionicon" {...props} />,
  HOME_OUTLINE: (props) => (
    <Icon name="home-outline" type="ionicon" {...props} />
  ),
  LIBRARY: (props) => <Icon name="library" type="ionicon" {...props} />,
  LIBRARY_OUTLINE: (props) => (
    <Icon name="library-outline" type="ionicon" {...props} />
  ),
  NOTIFICATIONS: (props) => (
    <Icon name="notifications" type="ionicon" {...props} />
  ),
  NOTIFICATIONS_OUTLINE: (props) => (
    <Icon name="notifications-outline" type="ionicon" {...props} />
  ),
  SETTINGS: (props) => <Icon name="settings" type="ionicon" {...props} />,
  SETTINGS_OUTLINE: (props) => (
    <Icon name="settings-outline" type="ionicon" {...props} />
  ),
  // Search
  SEARCH: (props) => (
    <Icon name="search" type="material-community" size={22} {...props} />
  ),
  // Add books/Open files
  PLUS: (props) => (
    <Icon name="plus" type="material-community" size={22} {...props} />
  ),
  OPEN_FILES: '',
  ADD_BOOK: '',
  // Others
  FILE: (props) => (
    <Icon
      name="file"
      size={24}
      color="black"
      style={{ marginLeft: 2 }}
      {...props}
    />
  ),
  // USER
  SIGN_IN: (props) => (
    <Icon
      name="sign-in"
      type="font-awesome"
      size={24}
      color="black"
      style={{ marginLeft: 2 }}
      {...props}
    />
  ),
  SIGN_UP: (props) => (
    <Icon
      name="pencil-square-o"
      type="font-awesome"
      size={24}
      color="black"
      style={{ marginLeft: 2 }}
      {...props}
    />
  ),
  SIGN_OUT: (props) => (
    <Icon
      name="sign-out"
      type="font-awesome"
      size={24}
      color="black"
      style={{ marginLeft: 2 }}
      {...props}
    />
  ),
  USER: '',
};

// const ICONS = {
//   // USER
//   SIGN_IN: {name: 'pencil-square-o'},
//   SIGN_UP: '',
//   SIGN_OUT: '',
//   USER: '',
//   NAME: {
//     // Bottom Tab Navigator (Ionicon icon)
//     HOME: 'home',
//     HOME_OUTLINE: 'home-outline',
//     LIBRARY: 'library',
//     LIBRARY_OUTLINE: 'library-outline',
//     NOTIFICATIONS: 'notifications',
//     NOTIFICATIONS_OUTLINE: 'notifications-outline',
//     SETTINGS: 'settings',
//     SETTINGS_OUTLINE: 'settings-outline',

//     // Favorite
//     HEART: '',
//     // Download
//     DOWNLOAD: '',
//     // Return
//     RETURN: '',
//     // Search
//     MAGNIFY: '',
//     // Add books/Open files
//     PLUS: '',
//     OPEN_FILES: '',
//     ADD_BOOK: '',
//     // HOME SCREEN
//     // LIBRARY SCREEN
//     // NOTIFICATIONS SCREEN
//     // SETTING SCREEN}
//   },
// };

export default ICONS;
