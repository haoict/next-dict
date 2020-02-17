import { combineReducers } from 'redux';
import { searchArea } from './search-area';
import { wordData } from './word-data';

export default combineReducers({
  searchArea,
  wordData
});
