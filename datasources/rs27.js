//https://www.apollographql.com/docs/tutorial/data-source/

const { RESTDataSource } = require("apollo-datasource-rest");

class PlayerAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `https://www.rs27baseball.com/api/getPlayerInfo.php?playerID=`;
    //this.baseURL = `https://www.rs27baseball.com/api/getPlayerInfo.php?playerID=${playerId}`;
  }

  async getPlayerById({ playerID }) {
    //console.log("playerId", playerID);
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
}

module.exports = PlayerAPI;
