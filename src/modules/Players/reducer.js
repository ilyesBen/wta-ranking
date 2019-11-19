import actionTypes from './actionTypes';

const initialState = {
  players: {},
  error: '',
  loading: false,
};

const initialPlayerState = {
  firstName: '',
  lastName: '',
  birthDate: '',
  hand: '',
  performances: [],
};

const playersReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.GET_PLAYER_LOAD: {
      const {playerId} = action.payload;
      return {
        ...state,
        players: {
          ...state.players,
          [playerId]: initialPlayerState,
        },
        loading: true,
        error: '',
      };
    }
    case actionTypes.GET_PLAYER_SUCCESS: {
      const {player, playerId} = action.payload;
      return {
        ...state,
        players: {
          ...state.players,
          [playerId]: player,
        },
        error: '',
        loading: false,
      };
    }
    case actionTypes.GET_PLAYER_ERROR: {
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
