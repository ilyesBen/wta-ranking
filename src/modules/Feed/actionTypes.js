import {creatActionTypes} from 'utils/actions';
import {Name} from './name';

const types = ['GET_PLAYERS_LOAD', 'GET_PLAYERS_SUCCESS', 'GET_PLAYERS_ERROR'];

const actionTypes = creatActionTypes(Name, types);

export default actionTypes;
