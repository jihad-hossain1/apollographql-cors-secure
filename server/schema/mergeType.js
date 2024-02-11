import { mergeTypeDefs } from "@graphql-tools/merge";
import userType from "./typeDefs/userType.js";

const typeDefs = mergeTypeDefs([userType]);

export default typeDefs;
