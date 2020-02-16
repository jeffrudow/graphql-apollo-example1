//https://www.apollographql.com/docs/tutorial/schema/

const { gql } = require("apollo-server");

const typeDefs = gql`
  type Player {
    id: ID!
    firstName: String
    lastName: String
    country: String
    dob: String
  }

  type Query {
    player(id: ID!): Player
  }
`;

module.exports = typeDefs;
