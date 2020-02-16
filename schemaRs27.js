//https://www.apollographql.com/docs/tutorial/schema/

const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    player(id: ID!): Player
    batting(playerId: ID!): [Batting]
  }

  type Player {
    id: ID!
    firstName: String
    lastName: String
    country: String
    dob: String
    batting: [Batting]
  }

  type Batting {
    playerId: ID!
    yearId: String
    teamId: String
    games: Int
    atBats: Int
    hits: Int
    hr: Int
    avg: Float
  }
`;

module.exports = typeDefs;
