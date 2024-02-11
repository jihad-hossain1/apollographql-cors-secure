require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const express = require("express");
const cors = require("cors");
const { expressMiddleware } = require("@apollo/server/express4");
const mongooseConnection = require("./config/databaseConnection");
const typeDefs = require("./schema/mergeType");
const resolvers = require("./schema/mergeResolver");
const mongoose = require("mongoose");

const port = process.env.PORT || 8000;

const app = express();

// mongooseConnection();

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

app.use(cors());
// server.applyMiddleware({ app });

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

// require("dotenv").config();
// const { ApolloServer } = require("@apollo/server");
// const { expressMiddleware } = require("@apollo/server/express4");
// const {
//   ApolloServerPluginDrainHttpServer,
// } = require("@apollo/server/plugin/drainHttpServer");
// const express = require("express");
// const http = require("http");
// const cors = require("cors");
// const mongooseConnection = require("./config/databaseConnection");
// const typeDefs = require("./schema/mergeType");
// const resolvers = require("./schema/mergeResolver");

// const app = express();

// const httpServer = http.createServer(app);

// mongooseConnection();

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
// });

// const port = process.env.PORT || 8000;

// server.start().then(() => {
//   app.use(
//     "/graphql",
//     cors(),
//     express.json(),
//     expressMiddleware(server, {
//       context: async ({ req }) => ({ token: req.headers.token }),
//     })
//   );

//   httpServer.listen(port, () => {
//     console.log(
//       `🚀 Server ready at http://localhost:${process.env.PORT}/graphql`
//     );
//   });
// });

// app.listen(port, console.log(`server runnng on port ${port}`));
