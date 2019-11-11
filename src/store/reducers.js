import {combineReducers} from 'redux';
import {feedName, feedReducer} from 'modules/Feed';

const reducers = combineReducers({
  [feedName]: feedReducer,
});

export default reducers;
