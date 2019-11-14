import {createSelector} from 'reselect';

const searchState = state => state.Search;

export const selectSearchResult = createSelector(
  searchState,
  state => state.list
);
