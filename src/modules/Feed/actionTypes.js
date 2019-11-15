import {creatActionTypes} from 'utils/actions';
import {Name} from './name';

const types = [
  'GET_PLAYERS_LOAD',
  'GET_PLAYERS_SUCCESS',
  'GET_PLAYERS_ERROR',
  'SET_FILTERS',
  'REFRESH_PLAYERS_LOAD',
  'LOAD_MORE_PLAYERS_LOAD',
  'LOAD_MORE_PLAYERS_SUCCESS',
];

const actionTypes = creatActionTypes(Name, types);

export default actionTypes;
