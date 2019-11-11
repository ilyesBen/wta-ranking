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
  dispatch(getPlayersLoad());
  try {
    const players = await api.getPlayers();
    dispatch(getPlayersSuccess(players));
  } catch (error) {
    dispatch(getPlayersError(error));
  }
};
