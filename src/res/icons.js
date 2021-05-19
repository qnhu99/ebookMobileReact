import React from 'react';
import { Icon } from 'react-native-elements';

const Icons = {
  home: props => {
    return <Icon name="home" type="ionicon" {...props} />;
  },
  home_outline: props => {
    return <Icon name="home-outline" type="ionicon" {...props} />;
  },
  library: props => {
    return <Icon name="library" type="ionicon" {...props} />;
  },
  library_outline: props => {
    return <Icon name="library-outline" type="ionicon" {...props} />;
  },
  notifications: props => {
    return <Icon name="notifications" type="ionicon" {...props} />;
  },
  notifications_outline: props => (
    <Icon name="notifications-outline" type="ionicon" {...props} />
  ),
  settings: props => {
    return <Icon name="settings" type="ionicon" {...props} />;
  },
  settings_outline: props => {
    return <Icon name="settings-outline" type="ionicon" {...props} />;
  },
  search: props => {
    return <Icon name="search" type="material-community" {...props} />;
  },
  plus: props => {
    return <Icon name="plus" type="material-community" {...props} />;
  },
  file: props => {
    return <Icon name="file" type="font-awesome" {...props} />;
  },
  sign_in: props => {
    return <Icon name="sign-in" type="font-awesome" {...props} />;
  },
  sign_up: props => {
    return <Icon name="pencil-square-o" type="font-awesome" {...props} />;
  },
  sign_out: props => {
    return <Icon name="sign-out" type="font-awesome" {...props} />;
  },
  filter: props => {
    return <Icon name="filter" type="font-awesome" {...props} />;
  },
  sort_alphabetical_ascending: props => {
    return (
      <Icon
        name="sort-alphabetical-ascending"
        type="material-community"
        {...props}
      />
    );
  },
  sort_alphabetical_descending: props => {
    return (
      <Icon
        name="sort-alphabetical-descending"
        type="material-community"
        {...props}
      />
    );
  },
  sort_descending: props => {
    return <Icon name="sort-descending" type="material-community" {...props} />;
  },
  sort_ascending: props => {
    return <Icon name="sort-ascending" type="material-community" {...props} />;
  },
};

export default Icons;
