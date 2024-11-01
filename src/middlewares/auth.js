const User = require("../models/user");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  try {
    // Reading the token
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      throw new Error("Token not valid");
    }
    // Validating the token
    const decodedToken = await jwt.verify(token, "DEVTinder_123");

    //Finding the user
    const { _id } = decodedToken;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found, please login afresh");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
};

module.exports = {
  userAuth,
};
