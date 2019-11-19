import * as api from 'api';
import navigationService from 'utils/navigationService';
import actionTypes from './actionTypes';
import {selectFilters, selectPlayers, selectLoadingMore} from './selectors';

// load by bunch of 10
const limit = 10;

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

const refreshPlayersLoad = () => ({type: actionTypes.REFRESH_PLAYERS_LOAD});

const loadMorePlayersLoad = () => ({type: actionTypes.LOAD_MORE_PLAYERS_LOAD});

const loadMorePlayersSuccess = players => ({
  type: actionTypes.LOAD_MORE_PLAYERS_SUCCESS,
  payload: {players},
});

export const getPlayers = () => async (dispatch, getState) => {
  const errorMessage = 'Network request error';

  dispatch(getPlayersLoad());

  const filters = selectFilters(getState());

  const body = {
    filter: filters,
    limit,
    offset: 0,
  };

  try {
    const players = await api.getPlayers(body);
    if (players.statusCode !== 200) {
      return dispatch(getPlayersError(errorMessage));
    }
    return dispatch(getPlayersSuccess(players.body));
  } catch (error) {
    return dispatch(getPlayersError(errorMessage));
  }
};

export const refreshPlayers = () => async (dispatch, getState) => {
  const errorMessage = 'Network request error';
  dispatch(refreshPlayersLoad());

  const filters = selectFilters(getState());

  const body = {
    filter: filters,
    limit,
    offset: 0,
  };

  try {
    const players = await api.getPlayers(body);
    if (players.statusCode !== 200) {
      return dispatch(getPlayersError(errorMessage));
    }
    return dispatch(getPlayersSuccess(players.body));
  } catch (error) {
    return dispatch(getPlayersError(errorMessage));
  }
};

export const loadMorePlayers = () => async (dispatch, getState) => {
  const errorMessage = 'Network request error';
  const loadingMore = selectLoadingMore(getState());
  const playersList = selectPlayers(getState());

  if (!loadingMore && playersList.length >= limit) {
    dispatch(loadMorePlayersLoad());

    const filters = selectFilters(getState());
    const offset = playersList.length;

    const body = {
      filter: filters,
      limit,
      offset,
    };

    try {
      const players = await api.getPlayers(body);
      if (players.statusCode !== 200) {
        return dispatch(getPlayersError(errorMessage));
      }
      return dispatch(loadMorePlayersSuccess(players.body));
    } catch (error) {
      return dispatch(getPlayersError(errorMessage));
    }
  }
  return 0;
};

export const applyFilters = filters => async dispatch => {
  dispatch(setFilters(filters));

  dispatch(getPlayers());

  navigationService.goBack();
};
