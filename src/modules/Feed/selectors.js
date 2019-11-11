import {createSelector} from 'reselect';

const feedState = state => state.Feed;

export const selectPlayers = createSelector(
  feedState,
  state => state.list
);
