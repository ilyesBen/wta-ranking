import endpoints from './endpoints';
import {post} from './request';

export const getPlayers = body => {
  return post(endpoints.getPlayers, body);
};

export const searchPlayers = body => {
  return post(endpoints.searchPlayers, body);
};

const mockPerformances = [
  {
    date: '2018-07-23',
    rankingPoints: 12368,
    ranking: 18,
  },
  {
    date: '2018-07-16',
    rankingPoints: 12681,
    ranking: 1,
  },
  {
    date: '2018-07-15',
    rankingPoints: 5913,
    ranking: 9,
  },
  {
    date: '2018-07-19',
    rankingPoints: 7684,
    ranking: 1,
  },
  {
    date: '2018-10-23',
    rankingPoints: 1920,
    ranking: 4,
  },
  {
    date: '2018-10-23',
    rankingPoints: 2167,
    ranking: 1,
  },
  {
    date: '2018-10-23',
    rankingPoints: 2167,
    ranking: 5,
  },
  {
    date: '2018-03-05',
    rankingPoints: 6734,
    ranking: 16,
  },
];

export const getPlayerDetails = body => {
  const test = {
    statusCode: 200,
    body: {
      firstName: 'El nemo',
      lastName: 'zebzoub',
      birthDate: '1994-10-02',
      hand: 'R',
      countryCode: 'USA',
      ranking: 2,
      performances: mockPerformances,
    },
  };

  return test;
  // return post(endpoints.getPlayerDetails, body);
};
