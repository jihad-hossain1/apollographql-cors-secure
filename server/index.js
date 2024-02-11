require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const express = require("express");
const http = require("http");
const cors = require("cors");
const mongooseConnection = require("./config/databaseConnection");
const typeDefs = require("./schema/mergeType");
const resolvers = require("./schema/mergeResolver");

const app = express();

const httpServer = http.createServer(app);

mongooseConnection();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const port = process.env.PORT || 8000;

server.start().then(() => {
  app.use(
    "/api/v1/graphql",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    })
  );

  // app.use("/",(req, res) => {
  //   res.json("welcome our apollo graphql home");
  // });

  httpServer.listen(port, () => {
    console.log(
      `🚀 Server ready at http://localhost:${process.env.PORT}/graphql`
    );
  });
});
