const mongoose = require("mongoose");

// BASIC STRUCTURE FILE FOR DB CONNECTION
//AFTER THIS CALL THIS FUNCTION IN SERVER.JS TO CONNECT DB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log(" MongoDB connected successfully");
  } catch (error) {
    console.error(" MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
