import {createSelector} from 'reselect';
import {labelMonths} from 'config/dates';
import {getMonth, getMax} from './utils';
import {allMonths} from '../../config/dates';

const playersState = state => state.Players;

const getData = (performances, months, field = 'rankingPoints') =>
  months.reduce((averages, month) => {
    const rankingPointsPerMonth = performances.reduce(
      (acc, performance) =>
        getMonth(performance.date) === month ? [...acc, performance[field]] : [...acc],
      []
    );

    const maxValuePerMonth = getMax(rankingPointsPerMonth);

    return [...averages, maxValuePerMonth];
  }, []);

export const selectLineChartData = createSelector(
  [playersState, (state, {playerId, landscape}) => ({playerId, landscape})],
  (state, {playerId, landscape}) => {
    const player = state.players[playerId];
    if (player) {
      const {performances} = player;
      const months = landscape ? allMonths : labelMonths;
      return getData(performances, months);
    }

    return [];
  }
);

export const selectBarChartData = createSelector(
  [playersState, (state, {playerId, landscape}) => ({playerId, landscape})],
  (state, {playerId, landscape}) => {
    const player = state.players[playerId];
    if (player) {
      const {performances} = player;
      const months = landscape ? allMonths : labelMonths;
      return getData(performances, months, 'ranking');
    }

    return [];
  }
);

export const selectPlayerInfo = createSelector(
  [playersState, (state, playerId) => playerId],
  (state, playerId) => {
    const player = state.players[playerId];
    if (player) {
      const {birthDate, firstName, hand, lastName, countryCode, ranking} = player;
      return {
        birthDate,
        firstName,
        hand,
        lastName,
        countryCode,
        ranking,
      };
    }

    return {birthDate: '', firstName: '', hand: '', lastName: '', ranking: ''};
  }
);
