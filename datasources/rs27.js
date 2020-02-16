//https://www.apollographql.com/docs/tutorial/data-source/

const { RESTDataSource } = require("apollo-datasource-rest");

class PlayerAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `https://www.rs27baseball.com/api/getPlayerInfo.php?playerID=`;
    //this.baseURL = `https://www.rs27baseball.com/api/getPlayerInfo.php?playerID=${playerId}`;
  }

  async getPlayerById({ playerID }) {
    const response = await this.get("getPlayerInfo.php", {
      playerID: playerID
    });
    //console.log(response);
    //const response = await this.get("getPlayerInfo.php", { playerId });
    //return this.playerReducer(response[0]);
    return this.playerReducer(response);
  }

  playerReducer(player) {
    return {
      id: player.playerID,
      firstName: player.nameFirst,
      lastName: player.nameLast,
      country: player.birthCountry,
      dob: new Date(
        player.birthYear + "-" + player.birthMonth + "-" + player.birthDay
      )
    };
  }

  async getBattingByPlayerId({ playerID }) {
    //console.log("playerId", playerID);
    const response = await this.get("getPlayerBatting.php", {
      playerID: playerID
    });
    //console.log(response);
    //return this.battingReducer(response[0]);
    //console.log(response.map(batting => this.battingReducer(batting)));
    return Array.isArray(response)
      ? response.map(batting => this.battingReducer(batting))
      : [];
  }

  battingReducer(batting) {
    return {
      playerId: batting.playerID,
      yearId: batting.yearID,
      teamId: batting.teamID,
      games: batting.G,
      atBats: batting.AB,
      hits: batting.H,
      hr: batting.HR,
      avg: (batting.H / batting.AB).toFixed(3)
    };
  }
}

module.exports = PlayerAPI;
