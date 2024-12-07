const { default: mongoose } = require("mongoose");
const mongo = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: "string", required: [true, "FirstName is required"] },
    lastName: { type: "string", required: [true, "LastName is required"] },
    email: {
      type: "string",
      required: [true, "Email is required"],
      unique: true,
    },
    password: { type: "string", required: [true, "Password is required"] },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;
