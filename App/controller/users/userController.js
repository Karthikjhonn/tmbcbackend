const UserModel = require("../../module/userModel");
const jwt = require("jsonwebtoken");
const createUser = async (req, res, next) => {
  console.log(req.body);
  const JWT_SECRET = process.env.JWT_SECRET;
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(401).send({ message: `All the fields are required` });
    }

    const user = await UserModel.create(req.body);
    const token = jwt.sign(
        { userId: user._id, email: user.email },
        JWT_SECRET,
        { expiresIn: "12d" }
      );
    res.status(200).json({
      message: "User created successfully",
      user,
      token
    });
  } catch (err) {
    console.log(err);

    if (err.code === 11000) {
      err.message = "User  already exists";
      err.status = 400;
    }
    next(err);
  }
};

const logIn = async (req, res, next) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  console.log(req.body);
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).send({ message: `All the fields are required` });
    }

    const user = await UserModel.findOne({
      email: { $regex: email },
      password: { $regex: password, $options: "i" },
    });
    if (!user) {
      const error = new Error("User not found!");
      error.status = 404;
      throw error;
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "12d" }
    );
    res.status(200).json({
      message: "Logged in successfully",
      user,
      token,
    });
  } catch (err) {
    console.log(err);

    if (err.code === 11000) {
      err.message = "User  already exists";
      err.status = 400;
    }
    next(err);
  }
};

module.exports = {
  createUser,
  logIn,
};
