import {creatActionTypes} from 'utils/actions';
import {Name} from './name';

const types = ['GET_PLAYER_LOAD', 'GET_PLAYER_SUCCESS', 'GET_PLAYER_ERROR'];

const actionTypes = creatActionTypes(Name, types);

export default actionTypes;
