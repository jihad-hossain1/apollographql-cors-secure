const mongoose = require("mongoose");

const mongooseConnection = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/test`);
    console.log("<------- Connected to MongoDB ------->");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
};

module.exports = mongooseConnection;
