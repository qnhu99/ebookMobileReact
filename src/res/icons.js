import React from 'react';
import { Icon } from 'react-native-elements';

const Icons = {
  home: props => <Icon name="home" type="ionicon" {...props} />,
  home_outline: props => <Icon name="home-outline" type="ionicon" {...props} />,
  file: props => <Icon name="file" type="font-awesome" {...props} />,
  file_outline: props => <Icon name="file-o" type="font-awesome" {...props} />,
  earth: props => <Icon name="earth" type="ionicon" {...props} />,
  earth_outline: props => (
    <Icon name="earth-outline" type="ionicon" {...props} />
  ),
  library: props => <Icon name="library" type="ionicon" {...props} />,
  library_outline: props => (
    <Icon name="library-outline" type="ionicon" {...props} />
  ),
  notifications: props => (
    <Icon name="notifications" type="ionicon" {...props} />
  ),
  notifications_outline: props => (
    <Icon name="notifications-outline" type="ionicon" {...props} />
  ),
  settings: props => <Icon name="settings" type="ionicon" {...props} />,
  settings_outline: props => (
    <Icon name="settings-outline" type="ionicon" {...props} />
  ),
  search: props => <Icon name="search" type="material-community" {...props} />,
  plus: props => <Icon name="plus" type="material-community" {...props} />,
  sign_in: props => <Icon name="sign-in" type="font-awesome" {...props} />,
  sign_up: props => (
    <Icon name="pencil-square-o" type="font-awesome" {...props} />
  ),
  sign_out: props => <Icon name="sign-out" type="font-awesome" {...props} />,
  filter: props => <Icon name="filter" type="font-awesome" {...props} />,
  sort_alphabetical_ascending: props => (
    <Icon
      name="sort-alphabetical-ascending"
      type="material-community"
      {...props}
    />
  ),
  sort_alphabetical_descending: props => (
    <Icon
      name="sort-alphabetical-descending"
      type="material-community"
      {...props}
    />
  ),
  sort_descending: props => (
    <Icon name="sort-descending" type="material-community" {...props} />
  ),
  sort_ascending: props => (
    <Icon name="sort-ascending" type="material-community" {...props} />
  ),
  menu: props => <Icon name="menu" type="material-community" {...props} />,
};

export default Icons;
