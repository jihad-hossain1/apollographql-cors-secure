const { mergeResolvers } = require("@graphql-tools/merge");
const userResolver = require("./resolvers/userResolvers");

const resolvers = mergeResolvers([userResolver]);

module.exports = resolvers;
