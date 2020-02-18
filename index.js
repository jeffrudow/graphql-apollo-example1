//https://www.apollographql.com/docs/tutorial/introduction/

const { ApolloServer } = require("apollo-server");

//const typeDefs = require("./schema");
const typeDefs = require("./schemaRs27");

//const { createStore } = require("./utils");

//const resolvers = require("./resolvers");
const resolvers = require("./resolversRs27");

//const LaunchAPI = require("./datasources/launch");
const PlayerAPI = require("./datasources/rs27");
//const UserAPI = require("./datasources/user");

//const store = createStore();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    //launchAPI: new LaunchAPI(),
    playerAPI: new PlayerAPI()
    //userAPI: new UserAPI({ store })
  }),
  playground: true
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
