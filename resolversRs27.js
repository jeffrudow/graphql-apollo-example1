//www.apollographql.com/docs/tutorial/resolvers/

https: module.exports = {
  Query: {
    player: (_, { id }, { dataSources }) =>
      //dataSources.playerAPI.getPlayerById({ playerID: id }),
      dataSources.playerAPI.getPlayerByIdWithBatting({ playerID: id }),
    batting: (_, { playerId }, { dataSources }) =>
      dataSources.playerAPI.getBattingByPlayerId({ playerID: playerId })
  }
};
