import User from "../../models/user.js";

const userResolver = {
  Query: {
    user: async (parent, { id }) => {
      try {
        const user = await User.findById(id);
        //   const user = await User.findById(args.id);
        return user;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch user");
      }
    },
    users: async (parent, args) => {
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch user");
      }
    },
  },
  Mutation: {
    createUser: async (_, { fullname, email }) => {
      try {
        const user = new User({ fullname, email });
        await user.save();
        return user;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to create user");
      }
    },
  },
};

export default userResolver;
