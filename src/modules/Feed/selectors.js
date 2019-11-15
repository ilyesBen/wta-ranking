import {createSelector} from 'reselect';

const feedState = state => state.Feed;

export const selectPlayers = createSelector(
  feedState,
  state => state.list
);

export const selectFilters = createSelector(
  feedState,
  state => state.filters
);

export const selectLoading = createSelector(
  feedState,
  state => state.loading
);

export const selectRefreshing = createSelector(
  feedState,
  state => state.refreshing
);

export const selectLoadingMore = createSelector(
  feedState,
  state => state.loadingMore
);
