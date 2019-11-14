import endpoints from './endpoints';
import {post} from './request';

export const getPlayers = body => {
  return post(endpoints.getPlayers, body);
};

export const searchPlayers = body => {
  return post(endpoints.searchPlayers, body);
};
