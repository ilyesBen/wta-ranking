import {createSelector} from 'reselect';

const searchState = state => state.Search;

export const selectSearchResult = createSelector(
  searchState,
  state => state.list
);

export const selectLoading = createSelector(
  searchState,
  state => state.loading
);

export const selectError = createSelector(
  searchState,
  state => state.error
);
