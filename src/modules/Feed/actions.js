import * as api from 'api';
import navigationService from 'utils/navigationService';
import actionTypes from './actionTypes';
import {selectFilters} from './selectors';

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

const setFilters = filters => ({
  payload: {filters},
  type: actionTypes.SET_FILTERS,
});

export const getPlayers = () => async (dispatch, getState) => {
  const errorMessage = 'Network request error';
  dispatch(getPlayersLoad());

  const filters = selectFilters(getState());

  const body = {
    filter: filters,
    limit: 10,
    offset: 0,
  };

  try {
    const players = await api.getPlayers(body);
    if (players.statusCode !== 200) {
      return dispatch(getPlayersError(errorMessage));
    }
    dispatch(getPlayersSuccess(players.body));
  } catch (error) {
    dispatch(getPlayersError(error));
  }
};

export const applyFilters = filters => async dispatch => {
  dispatch(setFilters(filters));

  dispatch(getPlayers());

  navigationService.goBack();
};
