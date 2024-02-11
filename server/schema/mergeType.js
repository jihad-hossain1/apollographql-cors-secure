const { mergeTypeDefs } = require("@graphql-tools/merge");
const userType = require("./typeDefs/userType");

const typeDefs = mergeTypeDefs([userType]);

module.exports = typeDefs;
