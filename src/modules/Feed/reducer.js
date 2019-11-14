import actionTypes from './actionTypes';

const initialState = {
  list: [],
  error: '',
  loading: false,
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
        list: [...state.list, ...players],
        loading: false,
      };
    }
    case actionTypes.GET_PLAYERS_ERROR: {
      const {error} = action.payload;
      return {
        ...state,
        loading: false,
        error,
      };
    }
    case actionTypes.SET_FILTERS: {
      return {
        ...state,
        filters: action.payload.filters,
      };
    }
    default:
      return state;
  }
};

export default playersReducer;
