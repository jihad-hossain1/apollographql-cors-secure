require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const express = require("express");
const cors = require("cors");
const { expressMiddleware } = require("@apollo/server/express4");
const typeDefs = require("./schema/mergeType");
const resolvers = require("./schema/mergeResolver");
const mongoose = require("mongoose");

const port = process.env.PORT || 8000;

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.start().then(() => {
  app.use(
    "/graphql",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    })
  );
});

// app.use(cors());

mongoose
  .connect(`${process.env.MONGODB_URI}/test`)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
