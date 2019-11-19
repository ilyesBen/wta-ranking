import * as api from 'api';
import actionTypes from './actionTypes';

const playerDetailsLoad = playerId => ({
  payload: {playerId},
  type: actionTypes.GET_PLAYER_LOAD,
});

const playerDetailsSuccess = (playerId, player) => ({
  payload: {playerId, player},
  type: actionTypes.GET_PLAYER_SUCCESS,
});

const playerDetailsError = error => ({
  payload: {error},
  type: actionTypes.GET_PLAYER_ERROR,
});

export const getPlayerDetails = playerId => dispatch => {
  const errorMessage = 'Network request failed';
  dispatch(playerDetailsLoad(playerId));

  try {
    const playerDetails = api.getPlayerDetails(playerId);
    if (playerDetails.statusCode !== 200) {
      dispatch(playerDetailsError(errorMessage));
    }
    dispatch(playerDetailsSuccess(playerId, playerDetails.body));
  } catch (error) {
    dispatch(playerDetailsError(errorMessage));
  }
};
