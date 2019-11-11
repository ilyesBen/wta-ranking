import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers';

const devMiddleware = __DEV__ ? [logger] : [];

const store = createStore(reducers, applyMiddleware(thunk, ...devMiddleware));

export default store;
