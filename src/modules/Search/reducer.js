import actionTypes from './actionTypes';

const initialState = {
  list: [],
  error: '',
  loading: false,
};

const playersReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.SEARCH_PLAYERS_LOAD:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.SEARCH_PLAYERS_SUCCESS: {
      const {players} = action.payload;
      return {
        ...state,
        list: players,
        loading: false,
      };
    }
    case actionTypes.SEARCH_PLAYERS_ERROR: {
      const {error} = action.payload;
      return {
        ...state,
        loading: false,
        error,
      };
    }
    default:
      return state;
  }
};

export default playersReducer;
