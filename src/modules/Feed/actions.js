import * as api from 'api';
import actionTypes from './actionTypes';

const getPlayersLoad = () => ({
  type: actionTypes.GET_PLAYERS_LOAD,
});

const getPlayersSuccess = players => ({
  payload: {players},
  type: actionTypes.GET_PLAYERS_SUCCESS,
});

const getPlayersError = error => ({
  payload: {error},
  type: actionTypes.GET_PLAYERS_ERROR,
});

export const getPlayers = () => async dispatch => {
  const errorMessage = 'Network request error';
  dispatch(getPlayersLoad());
  try {
    const players = await api.getPlayers();
    if (players.statusCode !== 200) {
      dispatch(getPlayersError(errorMessage));
    }
    dispatch(getPlayersSuccess(players.body));
  } catch (error) {
    dispatch(getPlayersError(error));
  }
};
