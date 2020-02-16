//www.apollographql.com/docs/tutorial/resolvers/
//const baseURL = "https://www.rs27baseball.com/api/getPlayerInfo.php?playerID=";

https: module.exports = {
  Query: {
    player: (_, { id }, { dataSources }) =>
      dataSources.playerAPI.getPlayerById({ playerID: id }),
    batting: (_, { playerId }, { dataSources }) =>
      dataSources.playerAPI.getBattingByPlayerId({ playerID: playerId })
    /*     playerBatting: (_, { id }, { dataSources }) => {
      dataSources.playerAPI.getPlayerById({ playerID: id }),
        dataSources.playerAPI.getBattingByPlayerId({ playerID: id });
    }*/
  }
};
