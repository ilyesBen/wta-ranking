import endpoints from './endpoints';
import {post} from './request';

export const getPlayers = async body => {
  const response = await post(endpoints.getPlayers, body);
  return response;
};
