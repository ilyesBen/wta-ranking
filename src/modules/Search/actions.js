import * as api from 'api';
import actionTypes from './actionTypes';

const searchPlayersLoad = () => ({
  type: actionTypes.SEARCH_PLAYERS_LOAD,
});

const searchPlayersSuccess = players => ({
  payload: {players},
  type: actionTypes.SEARCH_PLAYERS_SUCCESS,
});

const searchPlayersError = error => ({
  payload: {error},
  type: actionTypes.SEARCH_PLAYERS_ERROR,
});

export const searchPlayers = searchText => async dispatch => {
  const errorMessage = 'Network request error';
  dispatch(searchPlayersLoad());
  try {
    const body = {search: searchText};
    const players = await api.searchPlayers(body);
    if (players.statusCode !== 200) {
      dispatch(searchPlayersError(errorMessage));
    }
    dispatch(searchPlayersSuccess(players.body));
  } catch (error) {
    dispatch(searchPlayersError(errorMessage));
  }
};
