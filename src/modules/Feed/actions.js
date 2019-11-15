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

const loadMorePlayersSucess = players => ({
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
    dispatch(getPlayersSuccess(players.body));
  } catch (error) {
    dispatch(getPlayersError(error));
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
    dispatch(getPlayersSuccess(players.body));
  } catch (error) {
    dispatch(getPlayersError(error));
  }
};

export const loadMorePlayers = () => async (dispatch, getState) => {
  const errorMessage = 'Network request error';
  const loadingMore = selectLoadingMore(getState());

  if (!loadingMore) {
    dispatch(loadMorePlayersLoad());

    const filters = selectFilters(getState());

    const playersList = selectPlayers(getState());
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
      dispatch(loadMorePlayersSucess(players.body));
    } catch (error) {
      dispatch(getPlayersError(error));
    }
  }
};

export const applyFilters = filters => async dispatch => {
  dispatch(setFilters(filters));

  dispatch(getPlayers());

  navigationService.goBack();
};
