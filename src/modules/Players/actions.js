import * as api from 'api';
import actionTypes from './actionTypes';
import {selectPlayer} from './selectors';

const isObjectEmpty = object => Object.keys(object).length === 0;

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

export const getPlayerDetails = playerId => async (dispatch, getState) => {
  const errorMessage = 'Network request failed';
  const playerStatError = 'Stats not found for this player';

  const player = selectPlayer(getState(), {playerId});

  // caching
  if (!player) {
    dispatch(playerDetailsLoad(playerId));
  }

  try {
    const playerDetails = await api.getPlayerDetails({playerId});

    if (playerDetails.statusCode !== 200) {
      return dispatch(playerDetailsError(errorMessage));
    }
    if (isObjectEmpty(playerDetails.body)) {
      return dispatch(playerDetailsError(playerStatError));
    }
    return dispatch(playerDetailsSuccess(playerId, playerDetails.body));
  } catch (error) {
    return dispatch(playerDetailsError(playerStatError));
  }
};
