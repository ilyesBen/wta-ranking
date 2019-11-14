import {creatActionTypes} from 'utils/actions';
import {Name} from './name';

const types = ['GET_PLAYERS_LOAD', 'GET_PLAYERS_SUCCESS', 'GET_PLAYERS_ERROR', 'SET_FILTERS'];

const actionTypes = creatActionTypes(Name, types);

export default actionTypes;
