const db = require("mongoose");

const connectDB = async () => {
  try {
    db.connect(process.env.MONGO_URI);

    console.log("db connected successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connectDB };
