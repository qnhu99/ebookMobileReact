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
    <Icon name="magnify" type="material-community" size={22} {...props} />
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
      {...props}
    />
  ),
  SIGN_OUT: (props) => (
    <Icon
      name="sign-out"
      type="font-awesome"
      size={24}
      color="black"
      {...props}
    />
  ),
  FILTER: (props) => <Icon name="filter" type="font-awesome" {...props} />,
  SORT_ALPHABETICAL_ASCENDING: (props) => (
    <Icon
      name="sort-alphabetical-ascending"
      type="material-community"
      {...props}
    />
  ),
  SORT_ALPHABETICAL_DESCENDING: (props) => (
    <Icon
      name="sort-alphabetical-descending"
      type="material-community"
      {...props}
    />
  ),
  SORT_DESCENDING: (props) => (
    <Icon name="sort-descending" type="material-community" {...props} />
  ),
  SORT_ASCENDING: (props) => (
    <Icon name="sort-ascending" type="material-community" {...props} />
  ),
};

export default ICONS;
