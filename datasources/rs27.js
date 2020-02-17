//https://www.apollographql.com/docs/tutorial/data-source/

const { RESTDataSource } = require("apollo-datasource-rest");

class PlayerAPI extends RESTDataSource {
  constructor() {
    super();
    //this.baseURL = `https://www.rs27baseball.com/api/getPlayerInfo.php?playerID=`;
    this.baseURL = `https://www.rs27baseball.com/api/`;
    //this.baseURL = `https://www.rs27baseball.com/api/getPlayerInfo.php?playerID=${playerId}`;
  }

  async getPlayerById({ playerID }) {
    const response = await this.get("getPlayerInfo.php", {
      playerID: playerID
    });
    return this.playerReducer(response);
  }

  async getPlayerByIdWithBatting({ playerID }) {
    const responseP = await this.get("getPlayerInfo.php", {
      playerID: playerID
    });
    const responseB = await this.get("getPlayerBatting.php", {
      playerID: playerID
    });
    let responsePlayer = this.playerReducer(responseP);
    let responseBatting = responseB.map(batting =>
      this.battingReducer(batting)
    );
    let response = {
      ...responsePlayer,
      batting: [...responseBatting]
    };
    return response;
  }

  async getBattingByPlayerId({ playerID }) {
    const response = await this.get("getPlayerBatting.php", {
      playerID: playerID
    });
    return Array.isArray(response)
      ? response.map(batting => this.battingReducer(batting))
      : [];
  }

  playerReducer(player) {
    let birthMonthFinal = player.birthMonth.toString();
    let birthDayFinal = player.birthDay.toString();
    if (player.birthMonth < 10) {
      birthMonthFinal = "0" + player.birthMonth;
    }
    if (player.birthDay < 10) {
      birthDayFinal = "0" + player.birthDay;
    }
    return {
      id: player.playerID,
      firstName: player.nameFirst,
      lastName: player.nameLast,
      country: player.birthCountry,
      dob: player.birthYear + "-" + birthMonthFinal + "-" + birthDayFinal
    };
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
