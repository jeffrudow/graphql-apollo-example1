//www.apollographql.com/docs/tutorial/resolvers/
//const baseURL = "https://www.rs27baseball.com/api/getPlayerInfo.php?playerID=";

https: module.exports = {
  Query: {
    player: (_, { id }, { dataSources }) =>
      dataSources.playerAPI.getPlayerById({ playerID: id })
    //dataSources.playerAPI.getPlayerById({ id })
    //player: (parent, args) => {
    //  const { id } = args;
    //  return fetch(`${baseURL}${id}`).then(res => res.json());
    //}
  }
};
