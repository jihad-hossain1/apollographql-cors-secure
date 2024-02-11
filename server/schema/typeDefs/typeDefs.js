import { gql } from "graphql-tag";

const typeDefs = gql`
  type Query {
    greetings: String
    welcome(name: String!): String
  }
`;

export default typeDefs;
