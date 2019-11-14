import {creatActionTypes} from 'utils/actions';
import {Name} from './name';

const types = ['SEARCH_PLAYERS_LOAD', 'SEARCH_PLAYERS_SUCCESS', 'SEARCH_PLAYERS_ERROR'];

const actionTypes = creatActionTypes(Name, types);

export default actionTypes;
