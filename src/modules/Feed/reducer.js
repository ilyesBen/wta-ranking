import actionTypes from './actionTypes';

const initialState = {
  list: [],
  error: '',
  loading: false,
  refreshing: false,
  loadingMore: false,
  filters: {
    ranking: [],
    rankingPoints: [],
    date: '',
  },
};

const playersReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.GET_PLAYERS_LOAD:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_PLAYERS_SUCCESS: {
      const {players} = action.payload;
      return {
        ...state,
        list: players,
        loading: false,
        refreshing: false,
      };
    }
    case actionTypes.GET_PLAYERS_ERROR: {
      const {error} = action.payload;
      return {
        ...state,
        loading: false,
        refreshing: false,
        error,
      };
    }
    case actionTypes.SET_FILTERS: {
      return {
        ...state,
        filters: action.payload.filters,
      };
    }
    case actionTypes.REFRESH_PLAYERS_LOAD: {
      return {
        ...state,
        refreshing: true,
      };
    }
    case actionTypes.LOAD_MORE_PLAYERS_LOAD: {
      return {
        ...state,
        loadingMore: true,
      };
    }
    case actionTypes.LOAD_MORE_PLAYERS_SUCCESS: {
      const {players} = action.payload;
      return {
        ...state,
        list: [...state.list, ...players],
        loadingMore: false,
      };
    }

    default:
      return state;
  }
};

export default playersReducer;
