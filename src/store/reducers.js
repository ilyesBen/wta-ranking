import {combineReducers} from 'redux';
import {feedName, feedReducer} from 'modules/Feed';
import {searchName, searchReducer} from 'modules/Search';

const reducers = combineReducers({
  [feedName]: feedReducer,
  [searchName]: searchReducer,
});

export default reducers;
