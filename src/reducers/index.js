import { combineReducers } from 'redux';
import books from './books';
import locations from './locations';
import settings from './settings';
import globalSettings from './globalSettings';
import readerSettings from './readerSettings';
import recentBooks from './recentBooks';

export default combineReducers({
  books,
  locations,
  settings,
  globalSettings,
  readerSettings,
  recentBooks,
});
