import { mergeResolvers } from "@graphql-tools/merge";
import userResolver from "./resolvers/userResolvers.js";

const resolvers = mergeResolvers([userResolver]);

export default resolvers;
