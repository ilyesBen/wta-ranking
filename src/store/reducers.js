import {combineReducers} from 'redux';
import {feedName, feedReducer} from 'modules/Feed';
import {searchName, searchReducer} from 'modules/Search';
import {playersName, playersReducer} from 'modules/Players';

const reducers = combineReducers({
  [feedName]: feedReducer,
  [searchName]: searchReducer,
  [playersName]: playersReducer,
});

export default reducers;
