const resolvers = {
  Query: {
    greetings: () => "GraphQL is Awesome",
    welcome: (parent, args) => `Hello ${args.name}`,
  },
};

export default resolvers;
