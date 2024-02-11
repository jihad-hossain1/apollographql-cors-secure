import { gql } from "graphql-tag";

const userType = gql`
  type User {
    id: ID
    fullname: String
    email: String
    password: String
  }

  type Query {
    user(id: ID): User
    users: [User]
  }
  type Mutation {
    createUser(fullname: String!, email: String!, password: String!): User
  }
`;

export default userType;
