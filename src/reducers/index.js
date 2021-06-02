import { combineReducers } from 'redux';
import books from './books';
import locations from './locations';
import settings from './settings';
import globalSettings from './globalSettings';
import onlineBook from './onlineBook';

export default combineReducers({
  books,
  locations,
  settings,
  globalSettings,
  onlineBook,
});
