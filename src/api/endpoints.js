const rootUrl = 'https://17eh7vqjhh.execute-api.eu-west-1.amazonaws.com/dev/';

const endpoints = {
  getPlayers: `${rootUrl}get-players`,
  searchPlayers: `${rootUrl}search-players`,
  getPlayerDetails: `${rootUrl}/get-player-details`,
};

export default endpoints;
